'use client';

import React from 'react';
import Link from 'next/link';
import { Settings, User } from 'lucide-react';
import { useI18n } from '@/contexts/i18n-context';
import { NavigationLink } from './navigation-link';

export function NavigationMenu() {
  const { t } = useI18n();

  const navItems = [
    { href: '/orders', label: t.menu.orders },
    { href: '/groups', label: t.menu.groups },
    { href: '/products', label: t.menu.products },
    { href: '/users', label: t.menu.users },
    { href: '/settings', label: t.menu.settings },
  ];

  return (
    <aside className="z-20 flex min-h-[calc(100vh-74px)] w-[197px] shrink-0 flex-col items-center bg-white pt-[48px] pb-12 shadow-[2px_0_10px_rgba(0,0,0,0.05)]">
      {/* Circular Avatar Placeholder + Separate Bottom-Right Settings Button */}
      <div className="relative mb-[48px] h-[96px] w-[96px]">
        <div className="flex h-[96px] w-[96px] items-center justify-center overflow-hidden rounded-full border border-[#cfd8dc] bg-[#f0f3f5] text-[#90a4ae]">
          <User className="h-[48px] w-[48px]" strokeWidth={1.8} />
        </div>

        <Link
          href="/settings"
          title={t.menu.settings}
          aria-label={t.menu.settings}
          className="absolute -right-1 -bottom-1 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white text-[#546e7a] shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition-transform hover:scale-105 hover:text-[#2c3c44]"
        >
          <Settings className="h-[18px] w-[18px]" strokeWidth={2.2} />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex w-full flex-col items-center gap-[22px]">
        {navItems.map((item) => (
          <NavigationLink
            key={item.href}
            href={item.href}
            label={item.label}
          />
        ))}
      </nav>
    </aside>
  );
}
