import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export function Section({
  id,
  children,
  className,
  tone = 'default',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: 'default' | 'white' | 'ink';
}) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 md:py-24',
        tone === 'white' && 'bg-surface-elevated',
        tone === 'ink' && 'bg-ink text-white',
        className,
      )}
    >
      <div className="container-cxn">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={cn('mb-11 max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="text-balance text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-[2.35rem] lg:leading-tight">
        {title}
      </h2>
      {description ? <p className="mt-3.5 text-base leading-relaxed text-muted">{description}</p> : null}
    </div>
  );
}
