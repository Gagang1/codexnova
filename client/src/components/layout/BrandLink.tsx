import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { siteConfig } from '@/config/site';
import { BrandMark } from './BrandMark';
import { LogoMark } from './LogoMark';

type BrandLinkProps = {
  id?: string;
  className?: string;
  logoSize?: 'sm' | 'md' | 'lg';
  markSize?: 'sm' | 'md' | 'lg';
  tone?: 'light' | 'dark';
  showMark?: boolean;
  onNavigate?: () => void;
};

/** Consistent brand lockup: square rounded logo + optional wordmark. */
export function BrandLink({
  id,
  className,
  logoSize = 'md',
  markSize = 'lg',
  tone = 'light',
  showMark = true,
  onNavigate,
}: BrandLinkProps) {
  return (
    <Link
      id={id}
      to="/"
      onClick={onNavigate}
      className={cn('inline-flex min-h-11 items-center gap-2.5 shrink-0', className)}
    >
      <LogoMark size={logoSize} />
      <span className="sr-only">{siteConfig.name} home</span>
      {showMark ? <BrandMark size={markSize} tone={tone} aria-hidden /> : null}
    </Link>
  );
}
