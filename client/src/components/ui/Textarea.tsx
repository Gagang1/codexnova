import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function Textarea({ label, error, id, className, ...props }: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <div className="space-y-1.5">
      <label htmlFor={textareaId} className="block text-sm font-medium text-ink">
        {label}
        {props.required ? <span className="text-error"> *</span> : null}
      </label>
      <textarea
        id={textareaId}
        className={cn(
          'min-h-32 w-full rounded-xl border bg-surface-elevated px-3 py-2.5 text-ink shadow-sm placeholder:text-muted/70 transition-colors focus:border-primary focus:outline-none',
          error ? 'border-error' : 'border-border focus:border-primary',
          className,
        )}
        aria-invalid={Boolean(error)}
        {...props}
      />
      {error ? (
        <p role="alert" className="text-xs text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
