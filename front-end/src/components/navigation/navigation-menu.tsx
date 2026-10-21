'use client';

import Link from 'next/link';
import { Settings, User, X } from 'lucide-react';
import { Button } from '@/components/common/button';
import { useI18n } from '@/contexts/i18n-context';
import { NavigationLink } from './navigation-link';

export interface NavigationMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function NavigationMenu({ isOpen = false, onClose }: NavigationMenuProps) {
  const { t } = useI18n();

  const navItems = [
    { href: '/orders', label: t.menu.orders },
    { href: '/groups', label: t.menu.groups },
    { href: '/products', label: t.menu.products },
    { href: '/users', label: t.menu.users },
    { href: '/settings', label: t.menu.settings },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/45 backdrop-blur-xs lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-[220px] shrink-0 flex-col items-center bg-white pt-6 pb-12 shadow-2xl transition-transform duration-200 lg:sticky lg:top-[74px] lg:z-20 lg:h-[calc(100vh-74px)] lg:w-[197px] lg:translate-x-0 lg:pt-[48px] lg:shadow-[2px_0_10px_rgba(0,0,0,0.05)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex w-full justify-end px-4 mb-2 lg:hidden">
          <Button
            variant="subtle"
            shape="circle"
            size="icon-sm"
            onClick={onClose}
            aria-label={t.actions.close}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative mb-[48px] h-[96px] w-[96px]">
          <div className="flex h-[96px] w-[96px] items-center justify-center overflow-hidden rounded-full border border-line bg-surface text-ink-faint">
            <User className="h-[48px] w-[48px]" strokeWidth={1.8} />
          </div>

          <Link
            href="/settings"
            title={t.menu.settings}
            aria-label={t.menu.settings}
            onClick={onClose}
            className="absolute -right-1 -bottom-1 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white text-ink-soft shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition-transform hover:scale-105 hover:text-ink"
          >
            <Settings className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </Link>
        </div>

        <nav className="flex w-full flex-col items-center gap-[22px]">
          {navItems.map((item) => (
            <NavigationLink
              key={item.href}
              href={item.href}
              label={item.label}
              onClick={onClose}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}
