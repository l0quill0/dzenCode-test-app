import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ServiceWorkerRegister } from './service-worker-register';
import { dictionaries } from '@/i18n/dictionaries';

vi.mock('@/contexts/i18n-context', () => ({
  useI18n: () => ({
    locale: 'ru',
    t: dictionaries.ru,
    setLocale: vi.fn(),
  }),
}));

describe('ServiceWorkerRegister component', () => {
  const originalOnLine = navigator.onLine;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'onLine', {
      value: originalOnLine,
      configurable: true,
    });
  });

  it('does not display offline banner when online', () => {
    Object.defineProperty(navigator, 'onLine', {
      value: true,
      configurable: true,
    });

    render(<ServiceWorkerRegister />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('displays offline banner when offline', () => {
    Object.defineProperty(navigator, 'onLine', {
      value: false,
      configurable: true,
    });

    render(<ServiceWorkerRegister />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(dictionaries.ru.offlineNotice)).toBeInTheDocument();
  });
});
