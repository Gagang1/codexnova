import type { ReactNode } from 'react';
import { Button } from './Button';

export function EmptyState({
  title,
  description,
  actionLabel,
  actionTo,
  icon,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface-elevated px-6 py-14 text-center">
      {icon ? <div className="mx-auto mb-4 text-primary">{icon}</div> : null}
      <h2 className="text-xl font-bold text-ink">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">{description}</p>
      {actionLabel && actionTo ? (
        <div className="mt-6">
          <Button to={actionTo}>{actionLabel}</Button>
        </div>
      ) : null}
    </div>
  );
}
