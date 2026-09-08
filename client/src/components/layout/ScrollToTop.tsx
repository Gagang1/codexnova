import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** BrowserRouter-compatible scroll reset (ScrollRestoration needs a data router). */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
