'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';
import { TopMenu } from '@/components/navigation/top-menu';
import { NavigationMenu } from '@/components/navigation/navigation-menu';
import { LoginForm } from '@/components/auth/login-form';
import { I18nProvider } from '@/contexts/i18n-context';
import { useAppSelector } from '@/store/hooks';
import { StoreProvider } from '@/store/store-provider';
import type { Locale } from '@/i18n/dictionaries';

interface SearchContextValue {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const SearchContext = createContext<SearchContextValue>({
  searchQuery: '',
  setSearchQuery: () => {},
});

export function useSearch() {
  return useContext(SearchContext);
}

interface MainLayoutProps {
  initialLocale?: Locale;
  children: ReactNode;
}

function AuthenticatedShell({ children }: { children: ReactNode }) {
  const { user, token, isLoading } = useAppSelector((state) => state.auth);
  const isAuthenticated = Boolean(token && user);
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-surface">
        <TopMenu searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="flex flex-1 items-center justify-center">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-line border-t-brand" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col bg-surface">
        <TopMenu searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <LoginForm />
      </div>
    );
  }

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <div className="flex h-screen flex-col overflow-hidden bg-surface">
        <TopMenu searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <NavigationMenu />
          <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden pt-[48px] pr-[90px] pb-8 pl-[105px]">
            {children}
          </main>
        </div>
      </div>
    </SearchContext.Provider>
  );
}

export function MainLayout({
  initialLocale = 'ru',
  children,
}: MainLayoutProps) {
  return (
    <StoreProvider>
      <I18nProvider initialLocale={initialLocale}>
        <AuthenticatedShell>{children}</AuthenticatedShell>
      </I18nProvider>
    </StoreProvider>
  );
}
