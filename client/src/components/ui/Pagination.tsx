import { cn } from '@/utils/cn';

type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        className="min-h-11 rounded-lg border border-border px-3 text-sm font-medium disabled:opacity-40"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>
      {pages.map((value) => (
        <button
          key={value}
          type="button"
          aria-current={value === page ? 'page' : undefined}
          className={cn(
            'min-h-11 min-w-11 rounded-lg border text-sm font-semibold',
            value === page
              ? 'border-primary bg-primary text-white'
              : 'border-border bg-surface-elevated text-ink hover:border-primary/40',
          )}
          onClick={() => onPageChange(value)}
        >
          {value}
        </button>
      ))}
      <button
        type="button"
        className="min-h-11 rounded-lg border border-border px-3 text-sm font-medium disabled:opacity-40"
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </nav>
  );
}
