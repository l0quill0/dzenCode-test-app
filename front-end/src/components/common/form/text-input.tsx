'use client';

import React, { useState } from 'react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { Eye, EyeOff } from 'lucide-react';
import { ErrorMessage } from '@/components/common/error-message';

export interface TextInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'name' | 'value' | 'onChange' | 'onBlur'
  > {
  label?: string;
  field: AnyFieldApi;
  containerClassName?: string;
}

function formatFieldError(err: unknown): string | null {
  if (!err) return null;
  if (typeof err === 'string') return err;
  if (
    typeof err === 'object' &&
    'message' in err &&
    typeof err.message === 'string'
  ) {
    return err.message;
  }
  return null;
}

export function TextInput({
  id,
  label,
  type = 'text',
  containerClassName = '',
  field,
  className = '',
  ...props
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === 'password';
  const inputType = isPasswordField ? (showPassword ? 'text' : 'password') : type;
  const inputId = id ?? field.name;
  const error = formatFieldError(field.state.meta.errors?.[0]);

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`.trim()}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-[12px] font-semibold text-[#546e7a]"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={inputId}
          type={inputType}
          name={field.name}
          value={field.state.value ?? ''}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          className={`h-10 w-full rounded border bg-[#f8fafb] px-3 text-[14px] text-[#2c3c44] transition-colors outline-none focus:bg-white ${
            isPasswordField ? 'pr-10' : ''
          } ${
            error
              ? 'border-[#e53935] focus:border-[#e53935]'
              : 'border-[#cfd8dc] focus:border-[#8bc34a]'
          } ${className}`.trim()}
          {...props}
        />
        {isPasswordField && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2.5 flex cursor-pointer items-center justify-center text-[#78909c] transition-colors hover:text-[#2c3c44]"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      <ErrorMessage variant="inline" message={error} />
    </div>
  );
}
