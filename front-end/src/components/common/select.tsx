'use client';

import { type SelectHTMLAttributes, useId } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    'value' | 'onChange'
  > {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  containerClassName?: string;
}

export function Select({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  containerClassName = '',
  className = '',
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className={`flex items-center gap-2.5 ${containerClassName}`.trim()}>
      {label && (
        <label
          htmlFor={selectId}
          className="shrink-0 text-[13px] text-ink-muted"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-[30px] min-w-[220px] cursor-pointer rounded-[4px] border border-line bg-white px-3 text-[13px] font-semibold text-ink transition-colors outline-none focus:border-brand ${className}`.trim()}
        {...props}
      >
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
