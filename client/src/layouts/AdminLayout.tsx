import { NavLink, Outlet } from 'react-router-dom';
import { BrandMark } from '@/components/layout/BrandMark';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/courses', label: 'Courses' },
  { to: '/admin/categories', label: 'Categories' },
  { to: '/admin/students', label: 'Students' },
  { to: '/admin/enrollments', label: 'Enrollments' },
  { to: '/admin/inquiries', label: 'Inquiries' },
  { to: '/admin/faculty', label: 'Faculty' },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/events', label: 'Events' },
  { to: '/admin/blog', label: 'Blog' },
  { to: '/admin/testimonials', label: 'Testimonials' },
  { to: '/admin/faqs', label: 'FAQs' },
  { to: '/admin/settings', label: 'Settings' },
];

export function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-dvh bg-surface lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="border-b border-border bg-ink text-white lg:border-b-0 lg:border-r lg:border-white/10">
        <div className="px-5 py-4">
          <BrandMark tone="dark" />
          <span className="mt-1.5 block text-xs font-medium text-white/50">Admin</span>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:block lg:space-y-1 lg:overflow-visible lg:pb-6" aria-label="Admin">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `block min-h-10 whitespace-nowrap rounded-lg px-3 py-2 text-sm ${
                  isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex min-w-0 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-border bg-surface-elevated px-4 py-3">
          <p className="truncate text-sm text-muted">
            {user?.name} · {user?.role}
          </p>
          <Button type="button" size="sm" variant="outline" onClick={() => void logout()}>
            Logout
          </Button>
        </header>
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
