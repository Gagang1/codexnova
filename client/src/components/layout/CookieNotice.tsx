import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

const STORAGE_KEY = 'cxn_cookie_notice_accepted';

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed inset-x-3 bottom-3 z-40 max-w-xl border border-border bg-surface-elevated p-4 shadow-lift sm:inset-x-auto sm:left-4 sm:right-auto"
    >
      <p className="text-sm text-muted">
        We use essential cookies for admin sessions. Analytics cookies load only if measurement IDs are set.
        See the{' '}
        <Link to="/cookie-policy" className="font-semibold text-primary hover:underline">
          Cookie Policy
        </Link>
        .
      </p>
      <div className="mt-3">
        <Button
          type="button"
          size="sm"
          onClick={() => {
            localStorage.setItem(STORAGE_KEY, '1');
            setVisible(false);
          }}
        >
          Got it
        </Button>
      </div>
    </div>
  );
}
