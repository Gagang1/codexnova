import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

const tones = {
  default: 'bg-surface text-muted border-border',
  primary: 'bg-primary-50 text-primary-700 border-primary/15',
  secondary: 'bg-secondary-50 text-secondary-700 border-secondary/15',
  success: 'bg-green-50 text-success border-green-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
} as const;

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: keyof typeof tones;
};

export function Badge({ className, tone = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold',
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
