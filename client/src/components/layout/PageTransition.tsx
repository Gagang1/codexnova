import { Outlet, useLocation } from 'react-router-dom';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function PageTransition() {
  const location = useLocation();
  const reduce = usePrefersReducedMotion();

  return (
    <div key={location.pathname} className={reduce ? undefined : 'page-enter'}>
      <Outlet />
    </div>
  );
}
