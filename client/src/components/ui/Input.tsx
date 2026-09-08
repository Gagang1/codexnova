import type { InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export function Input({ label, error, hint, id, className, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="block text-sm font-medium text-ink">
        {label}
        {props.required ? <span className="text-error"> *</span> : null}
      </label>
      <input
        id={inputId}
        className={cn(
          'min-h-11 w-full rounded-xl border bg-surface-elevated px-3 text-ink shadow-sm placeholder:text-muted/70 transition-colors focus:border-primary focus:outline-none',
          error ? 'border-error' : 'border-border focus:border-primary',
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />
      {hint && !error ? (
        <p id={`${inputId}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${inputId}-error`} role="alert" className="text-xs text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
