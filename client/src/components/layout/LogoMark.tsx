import { cn } from '@/utils/cn';
import logo from '@/assets/images/brand/codexnova-logo.png';

type LogoMarkProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const sizes = {
  sm: 'h-10 w-10 p-1',
  md: 'h-11 w-11 p-1 sm:h-12 sm:w-12 sm:p-1.5',
  lg: 'h-12 w-12 p-1.5 sm:h-14 sm:w-14',
} as const;

const pixels = {
  sm: 40,
  md: 48,
  lg: 56,
} as const;

/** Square logo tile with rounded corners — navbar and footer only. */
export function LogoMark({ className, size = 'md' }: LogoMarkProps) {
  const px = pixels[size];

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-[inset_0_0_0_1px_rgb(15_23_42/0.06)]',
        'aspect-square',
        sizes[size],
        className,
      )}
    >
      <img
        src={logo}
        alt=""
        width={px}
        height={px}
        className="h-full w-full object-contain"
        decoding="async"
      />
    </span>
  );
}
