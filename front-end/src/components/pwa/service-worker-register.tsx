'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { WifiOff } from 'lucide-react';
import { useI18n } from '@/contexts/i18n-context';

function subscribeOnline(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getOnlineSnapshot() {
  return navigator.onLine;
}

function getServerSnapshot() {
  return true;
}

export function ServiceWorkerRegister() {
  const { t } = useI18n();
  const isOnline = useSyncExternalStore(
    subscribeOnline,
    getOnlineSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
      });
    }
  }, []);

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="animate__animated animate__fadeInUp fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-danger-line bg-danger-soft px-4 py-2 text-[12px] font-semibold text-danger-strong shadow-lg"
    >
      <WifiOff className="h-4 w-4" />
      <span>{t.offlineNotice}</span>
    </div>
  );
}
