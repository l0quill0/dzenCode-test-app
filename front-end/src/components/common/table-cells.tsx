'use client';

import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

const EMPTY = '—';

export type CellTone = 'strong' | 'soft' | 'faint' | 'brand';

const toneClasses: Record<CellTone, string> = {
  strong: 'text-ink',
  soft: 'text-ink-soft',
  faint: 'text-ink-faint',
  brand: 'text-brand',
};

const underlineClasses = 'underline decoration-line underline-offset-4';

function isEmpty(value: ReactNode) {
  return value === null || value === undefined || value === '' || value === false;
}

export interface TextCellProps {
  value?: ReactNode;
  tone?: CellTone;
  underline?: boolean;
  wrap?: boolean;
  className?: string;
}

export function TextCell({
  value,
  tone = 'soft',
  underline = false,
  wrap = false,
  className = '',
}: TextCellProps) {
  if (isEmpty(value)) {
    return <span className="text-[13px] text-ink-faint">{EMPTY}</span>;
  }

  return (
    <span
      className={`block text-[13px] leading-snug font-medium ${toneClasses[tone]} ${
        underline ? underlineClasses : ''
      } ${wrap ? 'whitespace-normal' : 'whitespace-nowrap'} ${className}`.trim()}
    >
      {value}
    </span>
  );
}

export interface StackedCellProps {
  primary?: ReactNode;
  secondary?: ReactNode;
  secondaryPosition?: 'above' | 'below';
  align?: 'start' | 'center';
  underline?: boolean;
  className?: string;
}

export function StackedCell({
  primary,
  secondary,
  secondaryPosition = 'below',
  align = 'start',
  underline = false,
  className = '',
}: StackedCellProps) {
  const secondaryLine = !isEmpty(secondary) && (
    <span className="text-[11px] text-ink-faint">{secondary}</span>
  );

  return (
    <div
      className={`flex flex-col gap-0.5 leading-tight whitespace-nowrap ${
        align === 'center' ? 'items-center' : 'items-start'
      } ${className}`.trim()}
    >
      {secondaryPosition === 'above' && secondaryLine}
      {isEmpty(primary) ? (
        <span className="text-[13px] text-ink-faint">{EMPTY}</span>
      ) : (
        <span
          className={`text-[13px] font-semibold text-ink ${
            underline ? underlineClasses : ''
          }`.trim()}
        >
          {primary}
        </span>
      )}
      {secondaryPosition === 'below' && secondaryLine}
    </div>
  );
}

export interface LabeledRow {
  label: ReactNode;
  value: ReactNode;
}

export function LabeledRowsCell({
  rows,
  className = '',
}: {
  rows: LabeledRow[];
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col text-[12px] leading-relaxed whitespace-nowrap ${className}`.trim()}
    >
      {rows.map((row, index) => (
        <div key={index} className="flex items-center justify-between gap-2.5">
          <span className="text-ink-faint">{row.label}</span>
          <span className="font-medium text-ink-soft">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

export function DotCell({ active }: { active: boolean }) {
  return (
    <span
      className={`block h-2.5 w-2.5 shrink-0 rounded-full ${
        active ? 'bg-brand' : 'bg-ink'
      }`}
    />
  );
}

export function IconCell({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="flex h-10 w-12 shrink-0 items-center justify-center text-ink-soft">
      <Icon className="h-8 w-8 stroke-[1.4]" />
    </div>
  );
}
