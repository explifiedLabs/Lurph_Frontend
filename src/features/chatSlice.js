import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createChat,
  getChats,
  getChat,
  getThreads,
  deleteChat,
  renameChat,
} from "../services/chatService";

// ─── Async thunks ─────────────────────────────────────────────────────────────

export const fetchChats = createAsyncThunk(
  "chat/fetchChats",
  async (_, { rejectWithValue }) => {
    try { return await getChats(); }
    catch (e) { return rejectWithValue(e); }
  },
);

export const startNewChat = createAsyncThunk(
  "chat/startNewChat",
  async ({ mode = "single", models = [] }, { rejectWithValue }) => {
    try { return await createChat(mode, models); }
    catch (e) { return rejectWithValue(e); }
  },
);

export const loadChat = createAsyncThunk(
  "chat/loadChat",
  async (chatId, { rejectWithValue }) => {
    try {
      const [chatData, threadData] = await Promise.all([
        getChat(chatId),
        getThreads(chatId).catch(() => null),
      ]);
      return { chatData, threadData };
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const removeChatFromList = createAsyncThunk(
  "chat/removeChatFromList",
  async (chatId, { rejectWithValue }) => {
    try {
      await deleteChat(chatId);
      return chatId;
    } catch (e) { return rejectWithValue(e); }
  },
);

export const renameChatTitle = createAsyncThunk(
  "chat/renameChatTitle",
  async ({ chatId, title }, { rejectWithValue }) => {
    try {
      await renameChat(chatId, title);
      return { chatId, title };
    } catch (e) { return rejectWithValue(e); }
  },
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    chatsLoading: false,
    activeChat: null,
    messages: [],
    messagesLoading: false,
    streamingState: {},
    activeExchangeIndex: 0,
  },

  reducers: {
    appendMessage(state, { payload }) {
      state.messages.push(payload);
    },

    setPendingUserPrompt(state, { payload: { prompt } }) {
      state.streamingState = { ...state.streamingState, pendingUserPrompt: prompt };
    },

    initStreamState(state, { payload: { model } }) {
      const key = model || "lurph";
      state.streamingState[key] = { streaming: true, content: "", error: null };
    },

    updateStreamChunk(state, { payload: { model, chunk } }) {
      const key = model || "lurph";
      if (!state.streamingState[key]) {
        state.streamingState[key] = { streaming: true, content: "", error: null };
      }
      state.streamingState[key].streaming = true;
      state.streamingState[key].content += chunk;
    },

    finaliseStream(state, { payload: { model } }) {
      const key = model || "lurph";
      const s = state.streamingState[key];
      if (!s) return;
      const errMsg = s.error
        ? (typeof s.error === "string" ? s.error : s.error?.message || "Error")
        : null;
      const finalContent = s.content || (errMsg ? `Error: ${errMsg}` : "");
      state.messages.push({
        role: "assistant", modelId: key, content: finalContent,
        error: s.error || null, timestamp: Date.now(),
      });
      const { [key]: _removed, ...rest } = state.streamingState;
      state.streamingState = rest;
    },

    finaliseAllStreams(state) {
      for (const [key, s] of Object.entries(state.streamingState)) {
        if (key === "pendingUserPrompt") continue;
        const errMsg = s.error
          ? (typeof s.error === "string" ? s.error : s.error?.message || "Error")
          : null;
        const finalContent = s.content || (errMsg ? `Error: ${errMsg}` : "");
        state.messages.push({
          role: "assistant", modelId: key, content: finalContent,
          error: s.error || null, timestamp: Date.now(),
        });
      }
      state.streamingState = {};
    },

    setStreamError(state, { payload: { model, error } }) {
      const key = model || "lurph";
      if (!state.streamingState[key]) {
        state.streamingState[key] = { streaming: false, content: "", error: null };
      }
      state.streamingState[key].streaming = false;
      state.streamingState[key].error = error;
    },

    clearStreamingState(state) {
      state.streamingState = {};
    },

    clearChat(state) {
      state.activeChat = null;
      state.messages = [];
      state.streamingState = {};
      state.activeExchangeIndex = 0;
    },

    setActiveExchangeIndex(state, { payload }) {
      state.activeExchangeIndex = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (s) => { s.chatsLoading = true; })
      .addCase(fetchChats.fulfilled, (s, { payload }) => {
        s.chatsLoading = false;
        s.chats = Array.isArray(payload) ? payload : (payload?.chats ?? payload?.data ?? []);
      })
      .addCase(fetchChats.rejected, (s) => { s.chatsLoading = false; });

    builder.addCase(startNewChat.fulfilled, (s, { payload }) => {
      const chat = payload?.chat ?? payload;
      if (chat?._id) {
        s.chats.unshift(chat);
        s.activeChat = chat;
        s.messages = [];
        s.streamingState = {};
      }
    });

    builder
      .addCase(loadChat.pending, (s) => {
        s.messagesLoading = true;
        s.streamingState = {};
        s.messages = [];
      })
      .addCase(loadChat.fulfilled, (s, { payload }) => {
        s.messagesLoading = false;
        const { chatData, threadData } = payload ?? {};
        const chat = chatData?.chat ?? chatData;
        s.activeChat = chat;
        
        if (threadData?.exchanges) {
          s.messages = parseExchanges(threadData.exchanges);
        } else {
          // Fallback to legacy format
          const threads = threadData?.threads ?? (Array.isArray(threadData) ? threadData : null);
          s.messages = flattenThreads(threads, chat);
        }
        
        s.streamingState = {};
        s.activeExchangeIndex = 0;
      })
      .addCase(loadChat.rejected, (s) => { s.messagesLoading = false; });

    builder.addCase(removeChatFromList.fulfilled, (s, { payload: chatId }) => {
      s.chats = s.chats.filter((c) => c._id !== chatId);
      if (s.activeChat?._id === chatId) {
        s.activeChat = null; s.messages = []; s.streamingState = {};
      }
    });

    builder.addCase(renameChatTitle.fulfilled, (s, { payload: { chatId, title } }) => {
      const c = s.chats.find((x) => x._id === chatId);
      if (c) c.title = title;
      if (s.activeChat?._id === chatId) s.activeChat.title = title;
    });
  },
});

// ─── parseExchanges ───────────────────────────────────────────────────────────
/**
 * Converts the array of exchanges mapping (prompts -> models' responses) directly into flat UI messages.
 */
function parseExchanges(exchanges) {
  if (!Array.isArray(exchanges) || exchanges.length === 0) return [];

  const result = [];
  for (const ex of exchanges) {
    if (!ex.prompt) continue;

    // Push User Prompt
    result.push({
      role: "user",
      content: ex.prompt,
      timestamp: Date.now(),
    });

    if (Array.isArray(ex.responses)) {
      for (const res of ex.responses) {
        let modelId = res.modelId;
        
        // Strip backend provider prefixes if present (except map free:gemini -> lurph)
        if (modelId) {
          if (modelId.startsWith("free:")) {
            modelId = "lurph";
          } else {
            const splitIdx = modelId.indexOf(":");
            if (splitIdx !== -1) {
              modelId = modelId.slice(splitIdx + 1);
            }
          }
        }

        result.push({
          role: "assistant",
          modelId: modelId,
          content: res.content || "",
          status: res.status || "pending",
          isMissing: res.isMissing || false,
          timestamp: Date.now(),
        });
      }
    }
  }

  return result;
}

// ─── flattenThreads (Legacy structure parser) ─────────────────────────────────
/**
 * Converts the backend per-model thread array into a flat message list.
 */
function flattenThreads(threads, chat) {
  if (!Array.isArray(threads) || threads.length === 0) return [];

  // ── ID Normalization & Lurph Disambiguation ──
  const seenIds = {};
  
  const normaliseId = (raw) => {
    if (!raw) return "unknown";
    if (raw.startsWith("free:")) return "lurph";
    
    const i = raw.indexOf(":");
    let stripped = i !== -1 ? raw.slice(i + 1) : raw;
    
    // Heuristic: Legacy backend DB threads may use "gemini:gemini-2.5-flash" instead of "free:gemini:..." for Lurph.
    if (stripped === "gemini-2.5-flash") {
       const explicitlyRequested = (chat?.activeModels || []).some(m => m.includes("gemini-2.5-flash"));
       if (!explicitlyRequested) {
         stripped = "lurph";
       } else if (seenIds["gemini-2.5-flash"]) {
         // If we already mapped a thread to Gemini, the duplicate is guaranteed to be Lurph.
         stripped = "lurph";
       }
    }
    
    seenIds[stripped] = true;
    return stripped;
  };

  // ✅ Extract messages safely
  const extractMsgs = (t) => {
    if (t.messages && Array.isArray(t.messages)) return t.messages;

    if (t.conversations && Array.isArray(t.conversations)) {
      const flat = [];

      for (const conv of t.conversations) {
        if (conv.user) {
          flat.push({
            role: "user",
            content: conv.user,
            createdAt: conv.createdAt,
          });
        }

        // ✅ ALWAYS PUSH assistant (even empty / failed)
        flat.push({
          role: "assistant",
          content: conv.assistant || "",
          status: conv.status,
          createdAt: conv.updatedAt || conv.createdAt,
        });
      }

      return flat;
    }

    return [];
  };

  // ✅ Build model reply map
  const modelReplies = {};

  for (const thread of threads) {
    const modelId = normaliseId(thread.modelId);
    const msgs = extractMsgs(thread);

    const map = new Map();
    let userIdx = -1;

    for (const msg of msgs) {
      if (msg.role === "user") {
        userIdx++;
      }

      if (msg.role === "assistant" && userIdx >= 0) {
        // ✅ ALWAYS STORE (even empty)
        map.set(userIdx, {
          content: msg.content || "",
          status: msg.status,
          createdAt: msg.createdAt,
        });
      }
    }

    modelReplies[modelId] = map;
  }

  // ✅ Find primary thread (for user order)
  let primaryThread = threads[0];
  let maxUserMsgs = extractMsgs(threads[0]).filter((m) => m.role === "user").length;

  for (const t of threads) {
    const count = extractMsgs(t).filter((m) => m.role === "user").length;
    if (count > maxUserMsgs) {
      primaryThread = t;
      maxUserMsgs = count;
    }
  }

  const userMessages = extractMsgs(primaryThread).filter((m) => m.role === "user");

  if (userMessages.length === 0) return [];

  const result = [];

  // ✅ MAIN LOOP
  for (let i = 0; i < userMessages.length; i++) {
    const userMsg = userMessages[i];
    const userContent = (userMsg.content || "").trim();

    if (!userContent) continue;

    // ✅ ALWAYS PUSH USER (IMPORTANT FIX)
    result.push({
      role: "user",
      content: userContent,
      timestamp: userMsg.createdAt,
    });

    // ✅ PUSH ALL MODELS (even empty)
    for (const [modelId, map] of Object.entries(modelReplies)) {
      const reply = map.get(i);

      result.push({
        role: "assistant",
        modelId,
        content: reply?.content || "", // 👈 important
        status: reply?.status || "pending",
        timestamp: reply?.createdAt || userMsg.createdAt,
      });
    }
  }

  return result;
}

export const {
  appendMessage,
  setPendingUserPrompt,
  updateStreamChunk,
  initStreamState,
  finaliseStream,
  finaliseAllStreams,
  setStreamError,
  clearStreamingState,
  clearChat,
  setActiveExchangeIndex,
} = chatSlice.actions;

export default chatSlice.reducer;