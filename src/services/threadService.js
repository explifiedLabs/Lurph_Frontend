import { apiFetch } from './apiConfig';

export const getThreads = (chatId) => 
  apiFetch(`/thread/${chatId}`);

export const deleteThread = (chatId, modelId) => 
  apiFetch(`/thread/${chatId}/${modelId}`, { method: 'DELETE' });