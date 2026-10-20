'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import {
  dictionaries,
  type Dictionary,
  type Locale,
} from '@/i18n/dictionaries';

const LOCALE_KEY = 'dzencode_locale';

if (!i18next.isInitialized) {
  void i18next.use(initReactI18next).init({
    resources: {
      ru: { translation: dictionaries.ru },
      en: { translation: dictionaries.en },
    },
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

interface I18nProviderProps {
  initialLocale?: Locale;
  children: React.ReactNode;
}

export function I18nProvider({
  initialLocale = 'ru',
  children,
}: I18nProviderProps) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    void i18next.changeLanguage(locale);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    void i18next.changeLanguage(newLocale);
    if (typeof document !== 'undefined') {
      document.cookie = `${LOCALE_KEY}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_KEY, newLocale);
    }
    router.refresh();
  };

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        t: dictionaries[locale],
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
