'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { io, type Socket } from 'socket.io-client';
import { store } from '@/store';
import { initializeAuth } from '@/store/slices/auth-slice';
import { setActiveSessions, setConnected } from '@/store/slices/socket-slice';

const SOCKET_URL = process.env.NEXT_PUBLIC_WS_URL;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

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

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
}
