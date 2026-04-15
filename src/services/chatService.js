import { apiFetch } from './apiConfig';

const API_URL = import.meta.env.VITE_API_URL || 'https://authapi-pf6diz22ka-uc.a.run.app/api';

// ─── Chats ────────────────────────────────────────────────────────────────────

export const createChat = (mode = 'single', models = []) =>
  apiFetch('/chat', { method: 'POST', body: JSON.stringify({ mode, models }) });

export const getChats = () =>
  apiFetch('/chat');

export const getChat = (chatId) =>
  apiFetch(`/chat/${chatId}`);

export const deleteChat = (chatId) =>
  apiFetch(`/chat/${chatId}`, { method: 'DELETE' });

export const renameChat = (chatId, title) =>
  apiFetch(`/chat/${chatId}/rename`, {
    method: 'PATCH',
    body: JSON.stringify({ title }),
  });

// ─── Messages ─────────────────────────────────────────────────────────────────

export const sendMessage = (chatId, prompt, models) =>
  apiFetch(`/chat/${chatId}/message`, {
    method: 'POST',
    body: JSON.stringify({ prompt, models }),
  });

// ─── SSE Streaming ───────────────────────────────────────────────────────────

/**
 * Opens an SSE connection for streaming responses.
 *
 * @param {string} chatId
 * @param {string} prompt
 * @param {Array}  models  - [{ provider, model }]
 * @param {object} callbacks
 *   - onChunk(data)   called for each SSE data event
 *   - onDone()        called when { done: true } arrives
 *   - onError(err)    called on network or server error
 * @returns {AbortController} — call .abort() to cancel the stream
 */
export const streamMessage = (chatId, prompt, models, { onChunk, onDone, onError } = {}) => {
  const controller = new AbortController();

  (async () => {
    try {
      const res = await fetch(`${API_URL}/chat/${chatId}/stream`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, models }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        // Surface quota errors clearly
        if (res.status === 402) {
          onError?.({ type: 'QUOTA_EXCEEDED', message: err.message });
        } else {
          onError?.({ type: 'HTTP_ERROR', message: err.message || 'Stream failed' });
        }
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let settled = false; // track if onDone/onError was already called

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // keep incomplete last line

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.done) {
              settled = true;
              onDone?.();
              return;
            }
            if (data.error) {
              settled = true;
              onError?.({ type: 'STREAM_ERROR', message: data.error });
              return;
            }
            onChunk?.(data);
          } catch {
            // Malformed SSE line — skip
          }
        }
      }

      // Stream closed naturally without explicit {done:true} — still finalise
      if (!settled) {
        onDone?.();
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        onError?.({ type: 'NETWORK_ERROR', message: err.message });
      }
    }
  })();

  return controller;
};

// ─── Threads ──────────────────────────────────────────────────────────────────

export const getThreads = (chatId) =>
  apiFetch(`/thread/${chatId}`);

export const deleteThread = (chatId, modelId) =>
  apiFetch(`/thread/${chatId}/${encodeURIComponent(modelId)}`, { method: 'DELETE' });

