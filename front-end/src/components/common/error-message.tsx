import type { ReactNode } from 'react';

export interface ErrorMessageProps {
  message?: string | null;
  children?: ReactNode;
  variant?: 'box' | 'inline';
  className?: string;
}

export function ErrorMessage({
  message,
  children,
  variant = 'box',
  className = '',
}: ErrorMessageProps) {
  const content = message ?? children;
  if (!content) return null;

  if (variant === 'inline') {
    return (
      <span
        role="alert"
        className={`text-[12px] text-danger ${className}`.trim()}
      >
        {content}
      </span>
    );
  }

  return (
    <div
      role="alert"
      className={`rounded border border-danger-line bg-danger-soft px-3 py-2 text-[13px] font-medium text-danger-strong ${className}`.trim()}
    >
      {content}
    </div>
  );
}
