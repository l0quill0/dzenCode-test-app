'use client';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { io, type Socket } from 'socket.io-client';
import { store } from '@/store';
import { initializeAuth } from '@/store/slices/auth-slice';
import { setActiveSessions, setConnected } from '@/store/slices/socket-slice';

const SOCKET_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3000';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void store.dispatch(initializeAuth());

    const socket: Socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
    });

    socket.on('connect', () => {
      store.dispatch(setConnected(true));
    });

    socket.on('disconnect', () => {
      store.dispatch(setConnected(false));
    });

    socket.on('activeSessions', (count: number) => {
      if (typeof count === 'number') {
        store.dispatch(setActiveSessions(count));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
