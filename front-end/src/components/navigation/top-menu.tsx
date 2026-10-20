'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import { Button } from '@/components/common/button';
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
      <div className="flex items-center gap-[102px]">
        <Link href="/orders" className="flex shrink-0 items-center">
          <Image
            src="/logo.png"
            alt={t.appTitle}
            width={155}
            height={48}
            priority
            className="h-[46px] w-auto object-contain select-none"
          />
        </Link>

        <div className="w-[412px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="h-[30px] w-full rounded-[4px] border border-line bg-surface px-3.5 text-[13px] font-semibold text-ink shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] placeholder:font-bold placeholder:text-ink focus:border-ink-faint focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-start text-[12px] leading-tight text-ink">
          <span className="mb-1 text-[13px] font-normal text-ink">
            {dayName}
          </span>
          <div className="flex items-center gap-4">
            <span className="text-[13px] font-bold text-ink">
              {formattedDate}
            </span>
            <div className="flex items-center gap-1.5 text-[13px] font-normal text-ink">
              <Clock className="h-[15px] w-[15px] text-brand" strokeWidth={2.2} />
              <span>{formattedTime}</span>
            </div>
            <div
              className="ml-2 flex items-center gap-1.5 text-[12px] text-ink-soft"
              title={getSessionsLabel(activeSessions)}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              <span className="font-bold text-ink">{activeSessions}</span>
              <span className="hidden xl:inline">
                {getSessionsLabel(activeSessions)}
              </span>
            </div>
          </div>
        </div>

        <div
          className="flex overflow-hidden rounded border border-line bg-surface-soft"
          role="group"
          aria-label={t.settings.languageLabel}
        >
          <Button
            variant={locale === 'ru' ? 'primary' : 'subtle'}
            shape="none"
            size="xs"
            onClick={() => setLocale('ru')}
            className="shadow-none"
          >
            RU
          </Button>
          <Button
            variant={locale === 'en' ? 'primary' : 'subtle'}
            shape="none"
            size="xs"
            onClick={() => setLocale('en')}
            className="border-l border-line shadow-none"
          >
            EN
          </Button>
        </div>
      </div>
    </header>
  );
}
