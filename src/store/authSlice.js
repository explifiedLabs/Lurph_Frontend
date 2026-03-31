import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../services/authServices';

export const loginUser = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    return await authService.login(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const registerUser = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    return await authService.register(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const googleLogin = createAsyncThunk('auth/google', async (_, thunkAPI) => {
  try {
    return await authService.googleAuth();
  } catch (error) {
    return thunkAPI.rejectWithValue(
      typeof error === 'string' ? error : 'Google sign-in failed'
    );
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await authService.logout();
  } catch (_) {}
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loadingEmail: false,
    loadingGoogle: false,
    error: null,
  },
  reducers: {
    logoutLocally: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Email login ──────────────────────────────────────────────────────────
      .addCase(loginUser.pending,   (state)         => { state.loadingEmail = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => { state.loadingEmail = false; state.user = action.payload.user || action.payload; state.isAuthenticated = true; })
      .addCase(loginUser.rejected,  (state, action) => { state.loadingEmail = false; state.error = action.payload; })

      // ── Register ─────────────────────────────────────────────────────────────
      .addCase(registerUser.pending,   (state)         => { state.loadingEmail = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => { state.loadingEmail = false; state.user = action.payload.user || action.payload; state.isAuthenticated = true; })
      .addCase(registerUser.rejected,  (state, action) => { state.loadingEmail = false; state.error = action.payload; })

      // ── Google login ─────────────────────────────────────────────────────────
      .addCase(googleLogin.pending,   (state)         => { state.loadingGoogle = true; state.error = null; })
      .addCase(googleLogin.fulfilled, (state, action) => { state.loadingGoogle = false; state.user = action.payload.user || action.payload; state.isAuthenticated = true; })
      .addCase(googleLogin.rejected,  (state, action) => { state.loadingGoogle = false; state.error = action.payload; })

      // ── Logout ───────────────────────────────────────────────────────────────
      .addCase(logoutUser.fulfilled, (state) => { state.user = null; state.isAuthenticated = false; state.error = null; })
      .addCase(logoutUser.rejected,  (state) => { state.user = null; state.isAuthenticated = false; state.error = null; });
  },
});

export const { logoutLocally, clearError } = authSlice.actions;
export default authSlice.reducer;