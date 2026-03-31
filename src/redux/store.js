// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice'; // Path to the authSlice.js you made

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // Adding middleware to ignore non-serializable data from Firebase if necessary
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});