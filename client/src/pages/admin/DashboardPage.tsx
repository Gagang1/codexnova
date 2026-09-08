import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';
import { Seo } from '@/components/ui/Seo';

export default function DashboardPage() {
  const query = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: async () => {
      const { data } = await api.get('/admin/dashboard');
      return data.data as Record<string, number>;
    },
  });

  const stats = [
    ['Students', query.data?.students ?? '—'],
    ['Enquiries', query.data?.inquiries ?? '—'],
    ['Enrollments', query.data?.enrollments ?? '—'],
    ['Active courses', query.data?.courses ?? '—'],
    ['Upcoming events', query.data?.events ?? '—'],
    ['Blog posts', query.data?.posts ?? '—'],
  ];

  const recent = useQuery({
    queryKey: ['admin-recent-inquiries'],
    queryFn: async () => {
      const { data } = await api.get('/inquiries', { params: { limit: 5 } });
      return (data.data ?? data) as Array<{ _id: string; name?: string; email?: string; createdAt?: string }>;
    },
  });

  return (
    <>
      <Seo title="Admin dashboard" description="Codex Nova operations" path="/admin" noIndex />
      <h1 className="text-2xl font-extrabold text-ink">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(([label, value]) => (
          <div key={label} className="border border-border bg-surface-elevated p-5">
            <p className="text-sm text-muted">{label}</p>
            <p className="mt-2 text-3xl font-extrabold text-ink">{value}</p>
          </div>
        ))}
      </div>
      <section className="mt-10">
        <h2 className="text-lg font-bold text-ink">Recent inquiries</h2>
        <div className="mt-3 overflow-x-auto border border-border bg-surface-elevated">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-surface text-muted">
              <tr>
                <th className="px-3 py-2 font-medium">Name</th>
                <th className="px-3 py-2 font-medium">Email</th>
                <th className="px-3 py-2 font-medium">When</th>
              </tr>
            </thead>
            <tbody>
              {(recent.data ?? []).length === 0 ? (
                <tr>
                  <td className="px-3 py-6 text-muted" colSpan={3}>
                    No inquiries yet.
                  </td>
                </tr>
              ) : (
                recent.data?.map((row) => (
                  <tr key={row._id} className="border-t border-border">
                    <td className="px-3 py-2">{row.name ?? '—'}</td>
                    <td className="px-3 py-2">{row.email ?? '—'}</td>
                    <td className="px-3 py-2">{row.createdAt ? new Date(row.createdAt).toLocaleString() : '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
