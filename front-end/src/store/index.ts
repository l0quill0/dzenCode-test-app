import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/store/slices/auth-slice';
import { socketReducer } from '@/store/slices/socket-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    socket: socketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
