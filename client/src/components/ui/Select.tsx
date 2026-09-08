import type { SelectHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type Option = { value: string; label: string };

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: Option[];
  error?: string;
  placeholder?: string;
};

export function Select({
  label,
  options,
  error,
  id,
  className,
  placeholder = 'Select an option',
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <div className="space-y-1.5">
      <label htmlFor={selectId} className="block text-sm font-medium text-ink">
        {label}
        {props.required ? <span className="text-error"> *</span> : null}
      </label>
      <select
        id={selectId}
        className={cn(
          'min-h-11 w-full rounded-xl border bg-surface-elevated px-3 text-ink shadow-sm',
          error ? 'border-error' : 'border-border focus:border-primary',
          className,
        )}
        aria-invalid={Boolean(error)}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p role="alert" className="text-xs text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
