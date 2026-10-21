import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant =
  | 'primary'
  | 'danger'
  | 'danger-outline'
  | 'secondary'
  | 'ghost'
  | 'ghost-danger'
  | 'subtle'
  | 'icon'
  | 'link';

export type ButtonShape = 'pill' | 'circle' | 'rounded' | 'none';

export type ButtonSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'icon-xs'
  | 'icon-sm'
  | 'icon-md'
  | 'auto';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  shape?: ButtonShape;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white shadow-sm hover:bg-brand-strong',
  danger: 'bg-white text-danger shadow-md hover:bg-danger-soft',
  'danger-outline':
    'border border-danger-line bg-danger-soft text-danger-strong hover:bg-danger-line',
  secondary:
    'border border-line bg-white text-ink-soft hover:bg-surface hover:text-ink',
  ghost: 'bg-transparent text-white hover:bg-white/15',
  'ghost-danger':
    'bg-transparent text-ink-faint hover:bg-danger-soft hover:text-danger',
  subtle: 'bg-transparent text-ink-soft hover:bg-line-soft hover:text-ink',
  icon: 'bg-transparent text-ink-muted hover:text-ink',
  link: 'bg-transparent text-brand hover:underline',
};

const shapeClasses: Record<ButtonShape, string> = {
  pill: 'rounded-full',
  circle: 'rounded-full p-0',
  rounded: 'rounded-[4px]',
  none: 'rounded-none',
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase',
  sm: 'h-8 px-4 text-[12px] font-semibold',
  md: 'h-10 px-6 text-[13px] font-bold tracking-wider uppercase',
  lg: 'h-12 px-8 text-[14px] font-bold tracking-wider uppercase',
  'icon-xs': 'h-7 w-7',
  'icon-sm': 'h-8 w-8',
  'icon-md': 'h-9 w-9',
  auto: 'h-auto p-0',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      shape = 'pill',
      size = 'md',
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
        className={`inline-flex cursor-pointer items-center justify-center gap-2 transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${sizeClasses[size]} ${shapeClasses[shape]} ${className}`.trim()}
        {...props}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
      </button>
    );
  },
);

Button.displayName = 'Button';
