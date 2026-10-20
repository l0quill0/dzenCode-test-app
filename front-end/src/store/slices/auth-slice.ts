import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api, getStoredToken, setStoredToken } from '@/lib/api';
import type { AuthResponse, User } from '@/types';

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
  isInitialized: false,
  error: null,
};

export const initializeAuth = createAsyncThunk<
  { token: string | null; user: User | null }
>('auth/initialize', async () => {
  const savedToken = getStoredToken();
  if (!savedToken) {
    return { token: null, user: null };
  }

  try {
    const user = await api.auth.me();
    return { token: savedToken, user };
  } catch {
    setStoredToken(null);
    return { token: null, user: null };
  }
});

export const loginUser = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await api.auth.login(email, password);
    setStoredToken(res.accessToken);
    return res;
  } catch {
    return rejectWithValue('INVALID_CREDENTIALS');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      setStoredToken(null);
      state.user = null;
      state.token = null;
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoading = false;
        state.isInitialized = true;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.token = null;
        state.user = null;
        state.isLoading = false;
        state.isInitialized = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
        state.isLoading = false;
        state.isInitialized = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload ?? 'INVALID_CREDENTIALS';
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;
