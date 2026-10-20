import React from 'react';

export interface ErrorMessageProps {
  message?: string | null;
  children?: React.ReactNode;
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
        className={`text-[12px] text-[#e53935] ${className}`.trim()}
      >
        {content}
      </span>
    );
  }

  return (
    <div
      role="alert"
      className={`rounded border border-[#ffcdd2] bg-[#ffebee] px-3 py-2 text-[13px] font-medium text-[#d32f2f] ${className}`.trim()}
    >
      {content}
    </div>
  );
}
