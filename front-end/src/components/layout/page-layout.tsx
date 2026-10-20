import React from 'react';

export interface PageLayoutProps {
  header: React.ReactNode;
  leadingAction?: React.ReactNode;
  headerExtras?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function PageLayout({
  header,
  leadingAction,
  headerExtras,
  className = 'w-full max-w-[1440px]',
  children,
}: PageLayoutProps) {
  return (
    <div className={className}>
      <div className="mb-10 flex flex-wrap items-center gap-[18px]">
        {leadingAction}
        <h1 className="text-[26px] font-bold tracking-tight text-[#2c3c44]">
          {header}
        </h1>
        {headerExtras}
      </div>
      {children}
    </div>
  );
}
