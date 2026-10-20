'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { useI18n } from '@/contexts/i18n-context';
import { useAppSelector } from '@/store/hooks';

interface TopMenuProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

export function TopMenu({ searchQuery = '', onSearchChange }: TopMenuProps) {
  const { locale, setLocale, t } = useI18n();
  const activeSessions = useAppSelector((state) => state.socket.activeSessions);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const updateClock = () => setNow(new Date());
    const initialTimer = setTimeout(updateClock, 0);
    const interval = setInterval(updateClock, 1000);
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const getSessionsLabel = (count: number): string => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) return t.activeSessionSingle;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
      return t.activeSessionFew;
    }
    return t.activeSessions;
  };

  const dayName = now ? t.daysOfWeek[now.getDay()] : t.daysOfWeek[2];
  const formattedDate = now
    ? `${String(now.getDate()).padStart(2, '0')} ${t.months[now.getMonth()]}, ${now.getFullYear()}`
    : `20 ${t.months[9]}, 2026`;
  const formattedTime = now
    ? `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    : '11:25';

  return (
    <header className="sticky top-0 z-30 flex h-[74px] w-full items-center justify-between bg-white pr-[90px] pl-[195px] shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
      {/* Left: Brand Logo + Search Input */}
      <div className="flex items-center gap-[102px]">
        <Link href="/orders" className="flex shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt={t.appTitle}
            className="h-[46px] w-auto object-contain select-none"
          />
        </Link>

        <div className="w-[412px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="h-[30px] w-full rounded-[4px] border border-[#cfd8dc] bg-[#f0f3f5] px-3.5 text-[13px] font-semibold text-[#2c3c44] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] placeholder:font-bold placeholder:text-[#2c3c44] focus:border-[#90a4ae] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Right: Real-time Date/Time + Active Sessions Counter + Language Toggle */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-start text-[12px] leading-tight text-[#2c3c44]">
          <span className="mb-1 text-[13px] font-normal text-[#2c3c44]">
            {dayName}
          </span>
          <div className="flex items-center gap-4">
            <span className="text-[13px] font-bold text-[#2c3c44]">
              {formattedDate}
            </span>
            <div className="flex items-center gap-1.5 text-[13px] font-normal text-[#2c3c44]">
              <Clock className="h-[15px] w-[15px] text-[#8bc34a]" strokeWidth={2.2} />
              <span>{formattedTime}</span>
            </div>
            <div
              className="ml-2 flex items-center gap-1.5 text-[12px] text-[#546e7a]"
              title={getSessionsLabel(activeSessions)}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8bc34a] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8bc34a]" />
              </span>
              <span className="font-bold text-[#2c3c44]">{activeSessions}</span>
              <span className="hidden xl:inline">
                {getSessionsLabel(activeSessions)}
              </span>
            </div>
          </div>
        </div>

        <div
          className="flex overflow-hidden rounded border border-[#cfd8dc] bg-[#f8fafb]"
          role="group"
          aria-label={t.settings.languageLabel}
        >
          <button
            type="button"
            onClick={() => setLocale('ru')}
            className={`cursor-pointer px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase transition-colors ${
              locale === 'ru'
                ? 'bg-[#8bc34a] text-white'
                : 'text-[#546e7a] hover:bg-[#eceff1] hover:text-[#2c3c44]'
            }`}
          >
            RU
          </button>
          <button
            type="button"
            onClick={() => setLocale('en')}
            className={`cursor-pointer border-l border-[#cfd8dc] px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase transition-colors ${
              locale === 'en'
                ? 'bg-[#8bc34a] text-white'
                : 'text-[#546e7a] hover:bg-[#eceff1] hover:text-[#2c3c44]'
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
