'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavigationLinkProps {
  href: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function NavigationLink({
  href,
  label,
  isActive,
  onClick,
}: NavigationLinkProps) {
  const pathname = usePathname();
  const active =
    isActive ?? (pathname === href || (href === '/orders' && pathname === '/'));

  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative pb-[6px] text-center text-[13px] font-bold tracking-[0.04em] text-ink uppercase transition-colors hover:text-ink-strong"
    >
      <span>{label}</span>
      {active && (
        <span className="absolute right-0 bottom-0 left-0 h-[3px] bg-brand" />
      )}
    </Link>
  );
}
