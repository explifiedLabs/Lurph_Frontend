import { configureStore } from '@reduxjs/toolkit';
import authReducer, { clearAuth, logoutUser } from '../features/authSlice';
import chatReducer, { clearChat } from '../features/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

/**
 * Listen for the 401 event that apiConfig.js fires.
 * Force-clear auth and chat state without needing a component to handle it.
 */
window.addEventListener('auth:expired', () => {
  store.dispatch(clearAuth());
  store.dispatch(clearChat());
});

export default store;