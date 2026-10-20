'use client';

import React, { createContext, useContext, useState } from 'react';
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
  children: React.ReactNode;
}

function AuthenticatedShell({ children }: { children: React.ReactNode }) {
  const { user, token, isLoading } = useAppSelector((state) => state.auth);
  const isAuthenticated = Boolean(token && user);
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f0f3f5]">
        <TopMenu searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="flex flex-1 items-center justify-center">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#cfd8dc] border-t-[#8bc34a]" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f0f3f5]">
        <TopMenu searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <LoginForm />
      </div>
    );
  }

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <div className="flex min-h-screen flex-col bg-[#f0f3f5]">
        <TopMenu searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="flex flex-1">
          <NavigationMenu />
          <main className="relative flex-1 overflow-x-hidden pt-[65px] pr-[90px] pb-16 pl-[105px]">
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
