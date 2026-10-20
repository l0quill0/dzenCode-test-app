'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavigationLinkProps {
  href: string;
  label: string;
  isActive?: boolean;
}

export function NavigationLink({ href, label, isActive }: NavigationLinkProps) {
  const pathname = usePathname();
  const active =
    isActive ?? (pathname === href || (href === '/orders' && pathname === '/'));

  return (
    <Link
      href={href}
      className="group relative pb-[6px] text-center text-[13px] font-bold tracking-[0.04em] text-[#2c3c44] uppercase transition-colors hover:text-[#1b252a]"
    >
      <span>{label}</span>
      {active && (
        <span className="absolute right-0 bottom-0 left-0 h-[3px] bg-[#8bc34a]" />
      )}
    </Link>
  );
}
