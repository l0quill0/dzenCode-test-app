import type { ReactNode } from 'react';

export interface PageLayoutProps {
  header: ReactNode;
  leadingAction?: ReactNode;
  headerExtras?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function PageLayout({
  header,
  leadingAction,
  headerExtras,
  className = 'w-full max-w-[1440px]',
  children,
}: PageLayoutProps) {
  return (
    <div className={`flex min-h-0 flex-1 flex-col ${className}`.trim()}>
      <div className="mb-7 flex shrink-0 flex-wrap items-center gap-[18px]">
        {leadingAction}
        <h1 className="text-[26px] font-bold tracking-tight text-ink">
          {header}
        </h1>
        {headerExtras}
      </div>
      {children}
    </div>
  );
}
