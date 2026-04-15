import React, { useEffect, useRef, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Copy, Check, ChevronLeft, ChevronRight, Key, ExternalLink, Settings } from "lucide-react";

// ─── Model metadata ───────────────────────────────────────────────────────────

const MODEL_META = {
  lurph: { label: "Lurph", color: "#FFD600" },
  "gpt-4o": { label: "GPT-4o", color: "#10a37f" },
  "gpt-4o-mini": { label: "GPT-4o mini", color: "#10a37f" },
  "gemini-2.5-flash": { label: "Gemini 2.5 Flash", color: "#4285f4" },
  "gemini-1.5-flash": { label: "Gemini 1.5 Flash", color: "#4285f4" },
  "deepseek-chat": { label: "DeepSeek", color: "#4D6BFE" },
  "claude-3-5-sonnet-20241022": { label: "Claude 3.5 Sonnet", color: "#D97706" },
  "claude-3-haiku-20240307": { label: "Claude 3 Haiku", color: "#D97706" },
  "grok-3": { label: "Grok 3", color: "#e5e5e5" },
  "mistral-large-latest": { label: "Mistral Large", color: "#f97316" },
  "mistral-small-latest": { label: "Mistral Small", color: "#f97316" },
  "openai/gpt-4o-mini": { label: "OR GPT-4o mini", color: "#7c3aed" },
  "openai/gpt-4o": { label: "OR GPT-4o", color: "#7c3aed" },
  "anthropic/claude-3-haiku": { label: "OR Claude 3 Haiku", color: "#D97706" },
  "anthropic/claude-3-sonnet": { label: "OR Claude 3 Sonnet", color: "#D97706" },
  "google/gemini-2.0-flash-001": { label: "OR Gemini 2.0 Flash", color: "#4285f4" },
};

const getMeta = (id) => MODEL_META[id] ?? { label: id ?? "AI", color: "#71717a" };

// ─── Cycling thinking messages ────────────────────────────────────────────────

const THINKING = [
  "Thinking…", "Reasoning through this…", "Crafting a response…",
  "Almost there…", "Processing your request…", "Generating answer…",
];

function useThinkingMsg(active) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!active) return;
    setIdx(0);
    const id = setInterval(() => setIdx((i) => (i + 1) % THINKING.length), 2200);
    return () => clearInterval(id);
  }, [active]);
  return THINKING[idx];
}

// ─── Shared atoms ─────────────────────────────────────────────────────────────

function TypingCursor() {
  return (
    <span style={{
      display: "inline-block", width: 2, height: "1em", background: "#FFD600",
      marginLeft: 2, verticalAlign: "text-bottom",
      animation: "cursorBlink 1s step-end infinite",
    }} />
  );
}

function ThinkingIndicator({ color }) {
  const msg = useThinkingMsg(true);
  return (
    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
      style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
      <div style={{ display: "flex", gap: 4 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: 5, height: 5, borderRadius: "50%", background: color, opacity: 0.8,
            animation: `dotBounce 1.4s ease-in-out ${i * 0.18}s infinite`,
          }} />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.span key={msg}
          initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }} transition={{ duration: 0.22 }}
          style={{ fontSize: 12, color: color + "aa", fontStyle: "italic" }}>
          {msg}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { }
      }}
      style={{
        display: "flex", alignItems: "center", gap: 4, padding: "3px 8px",
        borderRadius: 6, border: "none", background: "transparent",
        color: copied ? "#22c55e" : "#52525b", fontSize: 11,
        cursor: "pointer", fontFamily: "inherit",
      }}
      onMouseEnter={(e) => { if (!copied) e.currentTarget.style.color = "#a1a1aa"; }}
      onMouseLeave={(e) => { if (!copied) e.currentTarget.style.color = copied ? "#22c55e" : "#52525b"; }}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

// ─── API Key Missing Card ─────────────────────────────────────────────────────

function ApiKeyMissingCard({ error, color }) {
  const provider = error?.provider || "this provider";
  const keyUrl = error?.keyUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        borderRadius: 14,
        border: `1px solid ${color}25`,
        background: `linear-gradient(135deg, ${color}08, ${color}04)`,
        padding: "20px 18px",
        maxWidth: 360,
      }}
    >
      {/* Icon + Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `${color}15`,
          border: `1px solid ${color}25`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Key size={16} style={{ color }} />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#e4e4e7", lineHeight: 1.3 }}>
            {provider} API Key Required
          </div>
          <div style={{ fontSize: 11, color: "#71717a", marginTop: 2 }}>
            Add your key to unlock this model
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {keyUrl && (
          <a
            href={keyUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              padding: "9px 14px", borderRadius: 9,
              background: `${color}18`,
              border: `1px solid ${color}30`,
              color,
              fontSize: 13, fontWeight: 600,
              textDecoration: "none",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = `${color}28`}
            onMouseLeave={(e) => e.currentTarget.style.background = `${color}18`}
          >
            <ExternalLink size={13} />
            Get {provider} API Key
          </a>
        )}
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: "7px 12px", borderRadius: 8,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            fontSize: 12, color: "#71717a",
            cursor: "default",
          }}
        >
          <Settings size={11} />
          Then paste it in Settings → API Keys
        </div>
      </div>
    </motion.div>
  );
}

// ─── SINGLE MODEL — centred feed, model label only in sticky header ───────────

function SingleModelView({ modelId, exchanges, streamingState }) {
  const meta = getMeta(modelId);
  const scrollRef = useRef(null);
  const ss = streamingState?.[modelId];
  const isStreaming = ss?.streaming ?? false;

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [exchanges, ss?.content]);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, overflow: "hidden" }}>

      {/* ── Sticky model header — shown ONCE at the top ── */}
      <div style={{
        flexShrink: 0,
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 28px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.015)",
      }}>
        <div style={{
          width: 10, height: 10, borderRadius: "50%",
          background: meta.color,
          boxShadow: isStreaming ? `0 0 10px ${meta.color}66` : "none",
          animation: isStreaming ? "pulseDot 1.5s ease-in-out infinite" : "none",
          transition: "box-shadow 0.3s",
        }} />
        <span style={{
          fontSize: 12, fontWeight: 700, color: meta.color,
          letterSpacing: "0.06em", textTransform: "uppercase",
        }}>
          {meta.label}
        </span>
        {isStreaming && (
          <span style={{ fontSize: 10, color: meta.color + "88", animation: "pulseDot 1.5s ease-in-out infinite" }}>
            ● responding
          </span>
        )}
      </div>

      {/* ── Scrollable message feed ── */}
      <div ref={scrollRef} style={{
        flex: 1, overflowY: "auto", overflowX: "hidden",
        scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent",
      }}>
        <div style={{
          maxWidth: 720, margin: "0 auto",
          padding: "24px 28px 24px", width: "100%", boxSizing: "border-box",
        }}>

          {exchanges.map((ex, idx) => {
            const entry = ex.models.find((m) => m.modelId === modelId);
            const isLast = idx === exchanges.length - 1;
            const liveContent = isLast && ss?.content ? ss.content : entry?.content ?? "";
            const liveStream = isLast ? isStreaming : false;
            const liveError = isLast && ss?.error ? ss.error : entry?.error ?? null;

            // Only show thinking on the LAST exchange AND only when actively streaming
            const showThinking = isLast && liveStream && !liveContent && !liveError;
            // Skip rendering empty historical exchanges entirely
            const hasAnything = liveContent || liveError || showThinking;
            if (!hasAnything && !ex.userContent) return null;

            return (
              <div key={idx} style={{ marginBottom: 32 }}>

                {/* User bubble */}
                {ex.userContent && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
                    <div style={{
                      maxWidth: "68%", padding: "11px 16px",
                      borderRadius: "18px 18px 4px 18px",
                      background: "rgba(255,255,255,0.09)",
                      fontSize: 14, color: "#e4e4e7", lineHeight: 1.6,
                      whiteSpace: "pre-wrap", wordBreak: "break-word",
                    }}>
                      {ex.userContent}
                    </div>
                  </motion.div>
                )}

                {/* AI response — NO model label here, it's in the header */}
                {hasAnything && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: 0.04 }}>
                    {liveContent ? (
                      <>
                        <div className="prose-lurph">
                          <ReactMarkdown>{liveContent}</ReactMarkdown>
                          {liveStream && !liveError && <TypingCursor />}
                        </div>
                        {!liveStream && (
                          <div style={{ display: "flex", marginTop: 10 }}>
                            <CopyButton text={liveContent} />
                          </div>
                        )}
                      </>
                    ) : showThinking ? (
                      <ThinkingIndicator color={meta.color} />
                    ) : null}

                    {liveError && (
                      liveError?.type === "API_KEY_MISSING" ? (
                        <ApiKeyMissingCard error={liveError} color={meta.color} />
                      ) : (
                        <div style={{
                          fontSize: 13, color: "#f87171", lineHeight: 1.55,
                          padding: "10px 14px", borderRadius: 10,
                          background: "rgba(248,113,113,0.07)",
                          border: "1px solid rgba(248,113,113,0.18)",
                          marginTop: liveContent ? 10 : 0,
                        }}>
                          {typeof liveError === "string" ? liveError : liveError?.message || "An error occurred."}
                        </div>
                      )
                    )}
                  </motion.div>
                )}
              </div>
            );
          })}

          <div style={{ height: 1 }} />
        </div>
      </div>
    </div>
  );
}

// ─── MULTI MODEL — side-by-side columns, model label only in column header ────

function ModelColumn({ modelId, exchanges, streamingState, isLast, columnCount }) {
  const meta = getMeta(modelId);
  const scrollRef = useRef(null);
  const ss = streamingState?.[modelId];
  const isStreaming = ss?.streaming ?? false;

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [exchanges, ss?.content]);

  return (
    <div className="model-column" style={{
      flex: columnCount <= 3 ? `1 1 ${100 / columnCount}%` : "0 0 calc(100% / 3)",
      minWidth: columnCount <= 3 ? 0 : "calc(100% / 3)",
      width: columnCount > 3 ? "calc(100% / 3)" : undefined,
      display: "flex", flexDirection: "column", height: "100%",
      borderRight: isLast ? "none" : "1px solid rgba(255,255,255,0.08)",
      overflow: "hidden",
    }}>

      {/* ── Column header — model label shown ONCE here only ── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "8px 14px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.02)", flexShrink: 0, minHeight: 38,
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%", background: meta.color, flexShrink: 0,
          boxShadow: isStreaming ? `0 0 8px ${meta.color}66` : "none",
          animation: isStreaming ? "pulseDot 1.5s ease-in-out infinite" : "none",
          transition: "box-shadow 0.3s",
        }} />
        <span style={{
          fontSize: 12, fontWeight: 600, color: meta.color,
          letterSpacing: "0.02em", flex: 1,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {meta.label}
        </span>
        {isStreaming && (
          <span style={{ fontSize: 10, color: meta.color + "88", flexShrink: 0, animation: "pulseDot 1.5s ease-in-out infinite" }}>●</span>
        )}
      </div>

      {/* ── Scrollable messages ── */}
      <div ref={scrollRef} style={{
        flex: 1, overflowY: "auto", overflowX: "hidden",
        scrollbarWidth: "thin", scrollbarColor: `${meta.color}22 transparent`,
      }}>
        {exchanges.map((ex, idx) => {
          const entry = ex.models.find((m) => m.modelId === modelId);
          const isLast_ = idx === exchanges.length - 1;
          const liveContent = isLast_ && ss?.content ? ss.content : entry?.content ?? "";
          const liveStream = isLast_ ? isStreaming : false;
          const liveError = isLast_ && ss?.error ? ss.error : entry?.error ?? null;

          const showThinking = isLast_ && liveStream && !liveContent && !liveError;
          const hasAnything = liveContent || liveError || showThinking;

          return (
            <div key={idx}>
              {/* User bubble */}
              {ex.userContent && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: "flex", justifyContent: "flex-end", padding: "12px 14px 4px" }}>
                  <div style={{
                    maxWidth: "85%", padding: "8px 12px",
                    borderRadius: "14px 14px 4px 14px",
                    background: "rgba(255,255,255,0.08)",
                    fontSize: 13, color: "#e4e4e7", lineHeight: 1.5,
                    whiteSpace: "pre-wrap", wordBreak: "break-word",
                  }}>
                    {ex.userContent}
                  </div>
                </motion.div>
              )}

              {/* AI response — NO repeated model label */}
              {hasAnything && (
                <div style={{ padding: "8px 14px 14px" }}>
                  {liveContent ? (
                    <div>
                      <div className="prose-lurph">
                        <ReactMarkdown>{liveContent}</ReactMarkdown>
                        {liveStream && !liveError && <TypingCursor />}
                      </div>
                      {!liveStream && liveContent && (
                        <div style={{ display: "flex", marginTop: 6 }}>
                          <CopyButton text={liveContent} />
                        </div>
                      )}
                    </div>
                  ) : showThinking ? (
                    <ThinkingIndicator color={meta.color} />
                  ) : null}

                  {liveError && (
                    liveError?.type === "API_KEY_MISSING" ? (
                      <ApiKeyMissingCard error={liveError} color={meta.color} />
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
                        color: "#f87171", fontSize: 12, lineHeight: 1.5,
                        padding: "8px 10px", background: "rgba(248,113,113,0.07)",
                        borderRadius: 8, border: "1px solid rgba(248,113,113,0.15)",
                        marginTop: liveContent ? 8 : 0,
                      }}>
                        {typeof liveError === "string" ? liveError : liveError?.message || "An error occurred."}
                      </motion.div>
                    )
                  )}
                </div>
              )}
            </div>
          );
        })}
        <div style={{ height: 1 }} />
      </div>
    </div>
  );
}

export default function MessageThread({ messages, streamingState }) {
  const columnsRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Build exchanges from flat message list
  const exchanges = useMemo(() => {
    const result = [];
    let i = 0;

    while (i < messages.length) {
      const msg = messages[i];
      if (msg.role !== "user") { i++; continue; }
      const userContent = msg.content ?? msg.text ?? "";
      i++;
      const modelResponses = [];
      while (i < messages.length && messages[i].role === "assistant") {
        const m = messages[i];
        modelResponses.push({
          modelId: m.modelId ?? m.model ?? "lurph",
          content: m.content ?? "",
          error: m.error ?? null,
        });
        i++;
      }
      result.push({ userContent, models: modelResponses });
    }

    // Merge live streaming into last exchange
    const streamEntries = Object.entries(streamingState || {}).filter(
      ([k, s]) => k !== "pendingUserPrompt" && typeof s === "object" && (s.streaming || s.content || s.error),
    );
    if (streamEntries.length > 0) {
      let last = result[result.length - 1];
      if (!last) {
        last = { userContent: streamingState?.pendingUserPrompt ?? "", models: [] };
        result.push(last);
      }
      const existing = new Set(last.models.map((m) => m.modelId));
      for (const [modelId, s] of streamEntries) {
        if (!existing.has(modelId)) {
          last.models.push({ modelId, content: s.content ?? "", error: s.error ?? null });
          existing.add(modelId);
        }
      }
    }

    return result;
  }, [messages, streamingState]);

  // Collect all model IDs present in the conversation
  const allModelIds = useMemo(() => {
    const ids = new Set();
    for (const ex of exchanges) for (const m of ex.models) ids.add(m.modelId);
    for (const [k, s] of Object.entries(streamingState || {})) {
      if (k !== "pendingUserPrompt" && typeof s === "object" && (s.streaming || s.content || s.error)) ids.add(k);
    }
    return Array.from(ids).sort((a, b) => {
      if (a === "lurph") return -1;
      if (b === "lurph") return 1;
      return 0;
    });
  }, [exchanges, streamingState]);

  const isSingleModel = allModelIds.length === 1;
  const isMulti = allModelIds.length > 1;

  // Track scroll state for arrow visibility
  const updateScrollState = useCallback(() => {
    const el = columnsRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = columnsRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", updateScrollState); ro.disconnect(); };
  }, [updateScrollState, allModelIds]);

  const scrollBy = useCallback((dir) => {
    const el = columnsRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", flex: 1, minHeight: 0, overflow: "hidden" }}>
      <style>{`
        @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes dotBounce   { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
        @keyframes pulseDot    { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes spin        { to{transform:rotate(360deg)} }

        .prose-lurph { color:#d4d4d8; font-size:14px; line-height:1.72; }
        .prose-lurph p { margin:0 0 10px; }
        .prose-lurph p:last-child { margin-bottom:0; }
        .prose-lurph h1 { font-size:18px; font-weight:700; color:#f4f4f5; margin:16px 0 7px; }
        .prose-lurph h2 { font-size:16px; font-weight:600; color:#f4f4f5; margin:13px 0 6px; }
        .prose-lurph h3 { font-size:14px; font-weight:600; color:#f4f4f5; margin:11px 0 5px; }
        .prose-lurph code { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.10); border-radius:4px; padding:1px 5px; font-size:12.5px; color:#FFD600; font-family:'JetBrains Mono','Fira Code',monospace; }
        .prose-lurph pre { background:#0d0d11; border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:14px 16px; overflow-x:auto; margin:12px 0; }
        .prose-lurph pre code { background:transparent; border:none; padding:0; color:#e4e4e7; font-size:12.5px; }
        .prose-lurph ul,.prose-lurph ol { padding-left:20px; margin:8px 0; }
        .prose-lurph li { margin:4px 0; }
        .prose-lurph blockquote { border-left:3px solid rgba(255,214,0,0.35); padding-left:12px; color:#71717a; margin:10px 0; font-style:italic; }
        .prose-lurph table { width:100%; border-collapse:collapse; font-size:13px; }
        .prose-lurph th { background:rgba(255,255,255,0.05); padding:7px 12px; text-align:left; border:1px solid rgba(255,255,255,0.08); font-weight:600; }
        .prose-lurph td { padding:6px 12px; border:1px solid rgba(255,255,255,0.06); }
        .prose-lurph a { color:#FFD600; text-decoration:underline; text-underline-offset:2px; }
        .prose-lurph strong { color:#f4f4f5; font-weight:600; }
        .prose-lurph hr { border:none; border-top:1px solid rgba(255,255,255,0.07); margin:14px 0; }
        .prose-lurph img { max-width:100%; border-radius:8px; }

        .model-columns-wrap { scrollbar-width:none; -ms-overflow-style:none; }
        .model-columns-wrap::-webkit-scrollbar { display:none; }

        @media (max-width:640px) {
          .model-column { min-width:260px !important; flex: 0 0 260px !important; }
        }
      `}</style>

      {allModelIds.length === 0 ? (
        /* No models yet — generic spinner */
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#3f3f46", fontSize: 13, gap: 8 }}>
          <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.1)", borderTopColor: "#FFD600", animation: "spin 0.8s linear infinite" }} />
          Waiting for models…
        </div>
      ) : isSingleModel ? (
        <SingleModelView
          modelId={allModelIds[0]}
          exchanges={exchanges}
          streamingState={streamingState}
        />
      ) : (
        <div style={{ flex: 1, position: "relative", minHeight: 0, overflow: "hidden" }}>
          {/* Left arrow */}
          <AnimatePresence>
            {canScrollLeft && (
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => scrollBy(-1)}
                style={{
                  position: "absolute", left: 0, top: 0, bottom: 0, width: 36, zIndex: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(to right, rgba(10,10,10,0.9), transparent)",
                  border: "none", cursor: "pointer", color: "#a1a1aa",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFD600")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#a1a1aa")}
              >
                <ChevronLeft size={20} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Right arrow */}
          <AnimatePresence>
            {canScrollRight && (
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => scrollBy(1)}
                style={{
                  position: "absolute", right: 0, top: 0, bottom: 0, width: 36, zIndex: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(to left, rgba(10,10,10,0.9), transparent)",
                  border: "none", cursor: "pointer", color: "#a1a1aa",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFD600")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#a1a1aa")}
              >
                <ChevronRight size={20} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Columns */}
          <div ref={columnsRef} className="model-columns-wrap" style={{ height: "100%", display: "flex", flexDirection: "row", overflowX: "auto", overflowY: "hidden" }}>
            {allModelIds.map((modelId, i) => (
              <ModelColumn
                key={modelId} modelId={modelId}
                exchanges={exchanges} streamingState={streamingState}
                isLast={i === allModelIds.length - 1}
                columnCount={allModelIds.length}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}