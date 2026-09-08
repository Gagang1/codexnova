import { BrandMark } from './BrandMark';
import { siteConfig } from '@/config/site';

export function AnnouncementBar() {
  return (
    <div className="bg-ink px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
      <p className="inline-flex flex-wrap items-baseline justify-center gap-x-1.5">
        <BrandMark size="sm" tone="dark" className="text-sm sm:text-base" />
        <span className="text-white/40" aria-hidden>
          ·
        </span>
        <span>{siteConfig.announcement}</span>
      </p>
    </div>
  );
}
