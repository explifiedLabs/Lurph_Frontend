import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../services/authServices';
import * as apiKeyService from '../services/apiKeyService';

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const loginUser = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    return await authService.login(data);
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const registerUser = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    return await authService.register(data);
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const googleLogin = createAsyncThunk('auth/google', async (_, { rejectWithValue }) => {
  try {
    return await authService.googleAuth();
  } catch (err) {
    return rejectWithValue(typeof err === 'string' ? err : 'Google sign-in failed');
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await authService.logout();
  } catch (_) {
    // Always succeed — clear local state regardless of network
  }
});

export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, { rejectWithValue }) => {
  try {
    return await authService.getMe();
  } catch (err) {
    return rejectWithValue(err);
  }
});

// ─── API Key thunks ───────────────────────────────────────────────────────────

export const saveApiKey = createAsyncThunk(
  'auth/saveApiKey',
  async ({ provider, apiKey }, { dispatch, rejectWithValue }) => {
    try {
      const res = await apiKeyService.verifyAndSaveKey(provider, apiKey);
      // Refresh key status flags after saving
      dispatch(fetchKeyStatus());
      return { provider, ...res };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchKeyStatus = createAsyncThunk('auth/fetchKeyStatus', async (_, { rejectWithValue }) => {
  try {
    return await apiKeyService.getKeyStatus();
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const removeApiKey = createAsyncThunk(
  'auth/removeApiKey',
  async (provider, { dispatch, rejectWithValue }) => {
    try {
      await apiKeyService.deleteKey(provider);
      dispatch(fetchKeyStatus());
      return provider;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState = {
  user: null,
  isAuthenticated: false,

  // Per-operation loading flags — never one global "loading"
  loadingEmail: false,
  loadingGoogle: false,
  loadingUser: true,   // fetchMe in progress on app boot

  // API key state
  keyStatus: {},        // { openai: bool, gemini: bool, ... }
  keyLoading: false,    // a save/delete is in progress
  keyError: null,

  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Use this to force-clear auth (e.g. on 401 from any request)
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.keyStatus = {};
    },
    clearError: (state) => {
      state.error = null;
      state.keyError = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ── Login ────────────────────────────────────────────────────────────
      .addCase(loginUser.pending,   (state) => { state.loadingEmail = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loadingEmail = false;
        state.user = action.payload.user ?? action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected,  (state, action) => {
        state.loadingEmail = false;
        state.error = action.payload;
      })

      // ── Register ──────────────────────────────────────────────────────────
      .addCase(registerUser.pending,   (state) => { state.loadingEmail = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loadingEmail = false;
        state.user = action.payload.user ?? action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected,  (state, action) => {
        state.loadingEmail = false;
        state.error = action.payload;
      })

      // ── Google ────────────────────────────────────────────────────────────
      .addCase(googleLogin.pending,   (state) => { state.loadingGoogle = true; state.error = null; })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loadingGoogle = false;
        state.user = action.payload.user ?? action.payload;
        state.isAuthenticated = true;
      })
      .addCase(googleLogin.rejected,  (state, action) => {
        state.loadingGoogle = false;
        state.error = action.payload;
      })

      // ── Logout ────────────────────────────────────────────────────────────
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        state.keyStatus = {};
      })
      // Even if logout request fails, clear local state
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.keyStatus = {};
      })

      // ── fetchMe ───────────────────────────────────────────────────────────
      .addCase(fetchMe.pending, (state) => { state.loadingUser = true; })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.user = action.payload.user ?? action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loadingUser = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // ── API Key status ────────────────────────────────────────────────────
      .addCase(fetchKeyStatus.fulfilled, (state, action) => {
        state.keyStatus = action.payload;
      })

      // ── Save API Key ──────────────────────────────────────────────────────
      .addCase(saveApiKey.pending,   (state) => { state.keyLoading = true; state.keyError = null; })
      .addCase(saveApiKey.fulfilled, (state) => { state.keyLoading = false; })
      .addCase(saveApiKey.rejected,  (state, action) => {
        state.keyLoading = false;
        state.keyError = action.payload;
      })

      // ── Remove API Key ────────────────────────────────────────────────────
      .addCase(removeApiKey.pending,  (state) => { state.keyLoading = true; state.keyError = null; })
      .addCase(removeApiKey.fulfilled,(state) => { state.keyLoading = false; })
      .addCase(removeApiKey.rejected, (state, action) => {
        state.keyLoading = false;
        state.keyError = action.payload;
      });
  },
});

export const { clearAuth, clearError } = authSlice.actions;
export default authSlice.reducer;