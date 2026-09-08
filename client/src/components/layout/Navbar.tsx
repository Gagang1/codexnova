import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { navLinks } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { BrandLink } from './BrandLink';
import { MobileNav } from './MobileNav';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        scrolled
          ? 'border-border bg-surface-elevated/95 shadow-soft backdrop-blur-md'
          : 'border-transparent bg-surface/80 backdrop-blur-sm'
      }`}
    >
      <div className="container-cxn flex h-16 items-center justify-between gap-3 md:h-[4.25rem] lg:h-[4.75rem]">
        <BrandLink logoSize="md" markSize="lg" />

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `inline-flex min-h-11 items-center rounded-lg px-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-ink/80 hover:text-primary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button to="/enroll" size="sm">
              Enroll Now
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg xl:hidden hover:bg-primary-50"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      <MobileNav open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
