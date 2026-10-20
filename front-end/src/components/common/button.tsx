import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'danger' | 'secondary' | 'ghost';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#8bc34a] text-white shadow-sm hover:bg-[#7cb342]',
  danger:
    'bg-white text-[#e53935] shadow-md hover:bg-[#ffebee]',
  secondary:
    'border border-[#cfd8dc] bg-white text-[#546e7a] hover:bg-[#f0f3f5]',
  ghost:
    'bg-transparent text-white hover:bg-white/15',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      type = 'button',
      isLoading = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-full px-6 text-[13px] font-bold tracking-wider uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`.trim()}
        {...props}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
      </button>
    );
  },
);

Button.displayName = 'Button';
