import { Link } from 'react-router-dom';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

const variants = {
  primary:
    'bg-primary text-white shadow-soft hover:bg-primary-600 focus-visible:outline-primary',
  secondary:
    'bg-secondary text-white shadow-soft hover:bg-secondary-600 focus-visible:outline-secondary',
  outline:
    'border border-border bg-surface-elevated text-ink hover:border-primary/40 hover:text-primary',
  ghost: 'text-ink hover:bg-primary-50 hover:text-primary',
  danger: 'bg-error text-white hover:bg-red-700',
} as const;

const sizes = {
  sm: 'min-h-9 px-3 text-sm',
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-12 px-6 text-base',
} as const;

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined;
  };

type ButtonAsLink = CommonProps & {
  to: string;
  type?: never;
  disabled?: boolean;
  onClick?: () => void;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-[color,background-color,border-color,transform,box-shadow] duration-200 hover:-translate-y-px active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className,
  );

  if ('to' in props && props.to) {
    const { to, disabled, ...rest } = props;
    if (disabled) {
      return (
        <span className={classes} aria-disabled="true">
          {children}
        </span>
      );
    }
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
