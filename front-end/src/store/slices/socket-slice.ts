import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface SocketState {
  activeSessions: number;
  isConnected: boolean;
}

const initialState: SocketState = {
  activeSessions: 1,
  isConnected: false,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setConnected(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
    setActiveSessions(state, action: PayloadAction<number>) {
      state.activeSessions = action.payload;
    },
  },
});

export const { setConnected, setActiveSessions } = socketSlice.actions;
export const socketReducer = socketSlice.reducer;
