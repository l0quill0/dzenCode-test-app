'use client';

import React from 'react';
import { useI18n } from '@/contexts/i18n-context';

export function LanguageSwitcher() {
  const { t, locale, setLocale } = useI18n();

  return (
    <div className="flex items-center justify-between rounded-[4px] border border-[#cfd8dc] bg-white px-8 py-5">
      <span className="text-[14px] font-semibold text-[#2c3c44]">
        {t.settings.languageLabel}
      </span>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setLocale('ru')}
          className={`rounded-[3px] border px-4 py-1.5 text-xs font-bold transition-colors ${
            locale === 'ru'
              ? 'border-[#8bc34a] bg-[#8bc34a] text-white'
              : 'border-[#cfd8dc] bg-white text-[#546e7a] hover:text-[#2c3c44]'
          }`}
        >
          {t.settings.russian}
        </button>
        <button
          type="button"
          onClick={() => setLocale('en')}
          className={`rounded-[3px] border px-4 py-1.5 text-xs font-bold transition-colors ${
            locale === 'en'
              ? 'border-[#8bc34a] bg-[#8bc34a] text-white'
              : 'border-[#cfd8dc] bg-white text-[#546e7a] hover:text-[#2c3c44]'
          }`}
        >
          {t.settings.english}
        </button>
      </div>
    </div>
  );
}
