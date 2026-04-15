import React, {
  useState, useEffect, useRef, useCallback, useMemo,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import LurphInput, { MODELS } from "./ExpliInput";
import MessageThread from "./MessageThread";
import WelcomeScreen from "./WelcomeScreen";

import {
  startNewChat,
  loadChat,
  appendMessage,
  setPendingUserPrompt,
  updateStreamChunk,
  initStreamState,
  finaliseStream,
  finaliseAllStreams,
  setStreamError,
  clearStreamingState,
  clearChat,
} from "../../features/chatSlice";

import { streamMessage } from "../../services/chatService";
import { getKeyStatus } from "../../services/apiKeyService";

const PROVIDER_KEY_MAP = {
  OpenAI: "openai",
  Google: "gemini",
  Anthropic: "anthropic",
  DeepSeek: "deepseek",
  xAI: "grok",
  Mistral: "mistral",
  Meta: "meta",
  OpenRouter: "openrouter",
};

// Provider → API key URL mapping (matches AccountsSection.jsx PROVIDERS hints)
const PROVIDER_KEY_URLS = {
  openai:     "https://platform.openai.com/api-keys",
  gemini:     "https://aistudio.google.com/app/apikey",
  anthropic:  "https://console.anthropic.com/settings/keys",
  deepseek:   "https://platform.deepseek.com",
  grok:       "https://console.x.ai",
  mistral:    "https://console.mistral.ai",
  openrouter: "https://openrouter.ai/keys",
};

// Maps direct-provider model IDs → OpenRouter equivalents for auto-fallback
const OPENROUTER_FALLBACK = {
  "gpt-4o":                     "openai/gpt-4o",
  "gpt-4o-mini":                "openai/gpt-4o-mini",
  "claude-3-5-sonnet-20241022": "anthropic/claude-3-sonnet",
  "claude-3-haiku-20240307":    "anthropic/claude-3-haiku",
  "mistral-large-latest":       "mistralai/mistral-large",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildExternalModels(selectedModelIds) {
  return selectedModelIds
    .filter((id) => id !== "lurph")
    .map((id) => {
      const m = MODELS.find((x) => x.id === id);
      if (!m) return null;
      const mappedProvider = PROVIDER_KEY_MAP[m.provider] || m.provider.toLowerCase();
      return { provider: mappedProvider, model: m.id, _uiProvider: m.provider };
    })
    .filter(Boolean);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChatPanel() {
  const { chatId: urlChatId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { activeChat, messages, streamingState, messagesLoading } =
    useSelector((s) => s.chat);

  const [suggestionText, setSuggestionText] = useState("");

  // AbortController map: { [modelId]: AbortController }
  const abortRefs = useRef({});

  // Track which chatId we last dispatched loadChat for
  const lastLoadedRef = useRef(null);

  // FIX: track chatIds we just CREATED so we don't immediately loadChat them
  // (that would wipe the optimistic messages we just appended)
  const justCreatedRef = useRef(new Set());

  const isTyping = useMemo(
    () => Object.entries(streamingState || {}).some(
      ([k, s]) => k !== "pendingUserPrompt" && s?.streaming,
    ),
    [streamingState],
  );

  // ── Auto-stop: finalise all streams once every model is done/errored ────────
  useEffect(() => {
    const entries = Object.entries(streamingState || {}).filter(
      ([k]) => k !== "pendingUserPrompt"
    );
    // Nothing to do if no streams were ever opened
    if (entries.length === 0) return;

    const allDone = entries.every(([, s]) => !s?.streaming);
    if (allDone) {
      // Small delay so the last chunk's UI update renders before we finalise
      const timer = setTimeout(() => dispatch(finaliseAllStreams()), 120);
      return () => clearTimeout(timer);
    }
  }, [streamingState, dispatch]);

  // ── On mount (including page refresh), clear justCreated so loadChat fires ──
  useEffect(() => {
    justCreatedRef.current.clear();
  }, []);

  // ── Load chat when URL chatId changes ────────────────────────────────────────
  useEffect(() => {
    if (!urlChatId) {
      lastLoadedRef.current = null;
      return;
    }
    // Don't reload a chat we just created — it has no server messages yet
    // and loadChat would wipe the optimistic messages we just showed
    if (justCreatedRef.current.has(urlChatId)) return;

    // Navigating to a different chat — clear stale refs and state
    if (lastLoadedRef.current !== urlChatId) {
      // Clean up the justCreated set (old entries are no longer relevant)
      justCreatedRef.current.clear();
      // Cancel any ongoing streams from the previous chat
      Object.values(abortRefs.current).forEach((ctrl) => ctrl?.abort());
      abortRefs.current = {};
      dispatch(clearStreamingState());
    }

    lastLoadedRef.current = urlChatId;
    dispatch(loadChat(urlChatId));
  }, [urlChatId, dispatch]);

  // ── Abort all streams on unmount ─────────────────────────────────────────────
  useEffect(() => () => {
    Object.values(abortRefs.current).forEach((ctrl) => ctrl?.abort());
  }, []);

  // ── Stop all active streams ───────────────────────────────────────────────────
  const handleStopStreaming = useCallback(() => {
    Object.values(abortRefs.current).forEach((ctrl) => ctrl?.abort());
    abortRefs.current = {};
    dispatch(finaliseAllStreams());
  }, [dispatch]);

  // ── Open one SSE stream for a specific model ──────────────────────────────────
  const openStream = useCallback((chatId, prompt, modelId, streamPayload) => {
    dispatch(initStreamState({ model: modelId }));
    
    let active = true;
    const ctrl = streamMessage(
      chatId,
      prompt,
      streamPayload,
      {
        onChunk: (data) => {
          if (ctrl.signal.aborted) return;
          const text =
            data.text ??
            data.content ??
            data.chunk ??
            data.delta ??
            data.message ??
            "";
          if (text) dispatch(updateStreamChunk({ model: modelId, chunk: text }));
        },
        onDone: () => {
          if (ctrl.signal.aborted) return;
          dispatch(finaliseStream({ model: modelId }));
          delete abortRefs.current[modelId];
        },
        onError: (err) => {
          if (ctrl.signal.aborted) return;
          let msg;
          if (err?.type === "QUOTA_EXCEEDED") msg = "Quota exceeded. Please check your plan.";
          else if (err?.type === "STREAM_ERROR") msg = err.message || "Stream error.";
          else if (err?.type === "HTTP_ERROR") msg = err.message || "Request failed.";
          else if (err?.type === "NETWORK_ERROR") msg = "Network error. Please check your connection.";
          else msg = err?.message || "An unexpected error occurred.";
          dispatch(setStreamError({ model: modelId, error: msg }));
          delete abortRefs.current[modelId];
        },
      },
    );
    abortRefs.current[modelId] = ctrl;
  }, [dispatch]);

  // ── Main submit handler ────────────────────────────────────────────────────────
  const handleSubmit = useCallback(async ({ prompt, models: selectedModelIds }) => {
    const trimmed = prompt?.trim();
    if (!trimmed) return;

    // Cancel ongoing streams
    Object.values(abortRefs.current).forEach((ctrl) => ctrl?.abort());
    abortRefs.current = {};
    dispatch(clearStreamingState());

    const externalModels = buildExternalModels(selectedModelIds);
    const hasLurph = selectedModelIds.includes("lurph");
    const hasExternal = externalModels.length > 0;
    const isMulti = hasLurph ? hasExternal : externalModels.length > 1;

    // Validate API keys for external models upfront
    let keyStatus = {};
    if (hasExternal) {
      try { keyStatus = await getKeyStatus(); } catch (_) { keyStatus = {}; }
    }

    // ── 1. Ensure we have an active chat ──────────────────────────────────────
    let chatId = activeChat?._id;

    if (!chatId) {
      const result = await dispatch(
        startNewChat({ mode: isMulti ? "compare" : "single", models: externalModels }),
      );

      if (!startNewChat.fulfilled.match(result)) {
        console.error("Failed to create chat:", result.payload);
        return;
      }

      const created = result.payload?.chat ?? result.payload;
      chatId = created?._id;

      if (!chatId) {
        console.error("No chatId returned from backend", result.payload);
        return;
      }

      // FIX: mark this chatId so the loadChat useEffect skips it
      justCreatedRef.current.add(chatId);
      lastLoadedRef.current = chatId;

      navigate(`/chat/${chatId}`, { replace: true });
    }

    // ── 2. Optimistic user message ─────────────────────────────────────────────
    dispatch(appendMessage({
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
    }));

    // Store pending prompt so model cards show it while waiting for first chunk
    dispatch(setPendingUserPrompt({ prompt: trimmed }));

    // ── 3. Open SSE streams ────────────────────────────────────────────────────
    if (hasLurph) {
      openStream(chatId, trimmed, "lurph", []);
    }

    for (let { provider, model, _uiProvider } of externalModels) {
      // OpenRouter models always pass — backend manages routing
      if (provider === "openrouter") {
        openStream(chatId, trimmed, model, [{ provider, model }]);
        continue;
      }

      // Check if the direct provider key is available (rich format: { active, userKey, freeTier })
      const status = keyStatus[provider];
      const hasDirectKey = status?.active ?? (typeof status === "boolean" ? status : false);

      if (!hasDirectKey) {
        // Try OpenRouter fallback if user has OpenRouter key connected
        const orStatus = keyStatus["openrouter"];
        const hasOpenRouter = orStatus?.active ?? (typeof orStatus === "boolean" ? orStatus : false);
        const orModel = OPENROUTER_FALLBACK[model];

        if (hasOpenRouter && orModel) {
          // Reroute through OpenRouter
          provider = "openrouter";
          model = orModel;
        } else {
          const mappedProvider = PROVIDER_KEY_MAP[_uiProvider] || provider;
          dispatch(setStreamError({
            model,
            error: {
              type: "API_KEY_MISSING",
              provider: _uiProvider || provider,
              providerId: mappedProvider,
              keyUrl: PROVIDER_KEY_URLS[mappedProvider] || null,
              message: `Connect your ${_uiProvider || provider} API key to use this model`,
            },
          }));
          continue;
        }
      }

      openStream(chatId, trimmed, model, [{ provider, model }]);
    }
  }, [activeChat, isTyping, dispatch, navigate, openStream]);

  const hasMessages = Boolean(messages?.length);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
        overflow: "hidden",
        position: "relative",
        minWidth: 0,
      }}
    >
      {/* ── Main content area ── */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <AnimatePresence mode="wait">
          {messagesLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#3f3f46",
                fontSize: 13,
                gap: 10,
                minHeight: "60vh",
              }}
            >
              <LoadingSpinner />
              Loading conversation…
            </motion.div>
          ) : !hasMessages ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflowY: "auto",
              }}
            >
              <WelcomeScreen onSuggestionClick={setSuggestionText} />
            </motion.div>
          ) : (
            <motion.div
              key={`thread-${urlChatId ?? "new"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                minHeight: 0,
                height: "100%",
              }}
            >
              <MessageThread
                messages={messages}
                streamingState={streamingState}
                onStopStreaming={handleStopStreaming}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Input — always pinned at bottom ── */}
      <div
        style={{
          flexShrink: 0,
          padding: "8px 16px 12px",
          background: "linear-gradient(to top, #0a0a0a 60%, transparent)",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", width: "100%" }}>
          <LurphInput
            onSubmit={handleSubmit}
            isTyping={isTyping}
            chatNotPresent={!hasMessages}
            onStop={handleStopStreaming}
            suggestionText={suggestionText}
          />
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div
      style={{
        width: 18,
        height: 18,
        borderRadius: "50%",
        border: "2px solid rgba(255,255,255,0.1)",
        borderTopColor: "#FFD600",
        animation: "spin 0.8s linear infinite",
      }}
    />
  );
}