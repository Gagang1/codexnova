import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/api/client';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { Seo } from '@/components/ui/Seo';
import { Pagination } from '@/components/ui/Pagination';

const titles: Record<string, string> = {
  courses: 'Courses',
  categories: 'Categories',
  students: 'Students',
  enrollments: 'Enrollments',
  inquiries: 'Inquiries',
  instructors: 'Faculty',
  projects: 'Projects',
  events: 'Events',
  blog: 'Blog',
  testimonials: 'Testimonials',
  faqs: 'FAQs',
  settings: 'Settings',
};

type Row = Record<string, unknown> & { _id: string };

export function AdminResourcePage({ resource }: { resource: string }) {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<Row | 'new' | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Row | null>(null);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['admin', resource, q, page],
    queryFn: async () => {
      const { data } = await api.get(`/${resource}`, { params: { q, page, limit: 10 } });
      if (Array.isArray(data?.data)) {
        return { items: data.data as Row[], total: Number(data.total ?? data.data.length) };
      }
      if (Array.isArray(data?.items)) {
        return { items: data.items as Row[], total: Number(data.total ?? data.items.length) };
      }
      if (Array.isArray(data)) {
        return { items: data as Row[], total: data.length };
      }
      return { items: [] as Row[], total: 0 };
    },
  });

  const items = query.data?.items ?? [];
  const total = query.data?.total ?? items.length;
  const pageCount = Math.max(1, Math.ceil(total / 10));

  const save = useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      if (editing && editing !== 'new') {
        await api.put(`/${resource}/${editing._id}`, payload);
      } else {
        await api.post(`/${resource}`, payload);
      }
    },
    onSuccess: () => {
      toast.success('Saved');
      setEditing(null);
      void queryClient.invalidateQueries({ queryKey: ['admin', resource] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => api.delete(`/${resource}/${id}`),
    onSuccess: () => {
      toast.success('Deleted');
      setPendingDelete(null);
      void queryClient.invalidateQueries({ queryKey: ['admin', resource] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const columns = useMemo(() => columnsFor(resource, items[0]), [resource, items]);

  return (
    <>
      <Seo title={titles[resource] ?? resource} description="Codex Nova admin" noIndex />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-extrabold text-ink">{titles[resource] ?? resource}</h1>
        {resource !== 'settings' ? (
          <Button type="button" onClick={() => setEditing('new')}>
            New
          </Button>
        ) : null}
      </div>
      <div className="mt-4">
        <Input label="Search" value={q} onChange={(event) => { setQ(event.target.value); setPage(1); }} />
      </div>
      <div className="mt-4 overflow-x-auto border border-border bg-surface-elevated">
        {query.isLoading ? (
          <p className="p-6 text-sm text-muted">Loading…</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm text-muted">No records yet.</p>
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead className="bg-surface text-muted">
              <tr>
                {columns.map((column) => (
                  <th key={column} className="px-3 py-2 font-medium capitalize">
                    {column}
                  </th>
                ))}
                <th className="px-3 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row._id} className="border-t border-border">
                  {columns.map((column) => (
                    <td key={column} className="max-w-[16rem] truncate px-3 py-2">
                      {renderCell(row[column])}
                    </td>
                  ))}
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <button type="button" className="text-primary hover:underline" onClick={() => setEditing(row)}>
                        Edit
                      </button>
                      {resource !== 'settings' ? (
                        <button type="button" className="text-error hover:underline" onClick={() => setPendingDelete(row)}>
                          Delete
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="mt-4">
        <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
      </div>

      <Modal open={Boolean(editing)} onClose={() => setEditing(null)} title={editing === 'new' ? 'Create' : 'Edit'}>
        {editing ? (
          <ResourceForm
            resource={resource}
            initial={editing === 'new' ? {} : editing}
            busy={save.isPending}
            onSubmit={(payload) => save.mutate(payload)}
          />
        ) : null}
      </Modal>

      <Modal open={Boolean(pendingDelete)} onClose={() => setPendingDelete(null)} title="Delete record?">
        <p className="text-sm text-muted">This cannot be undone from the admin UI.</p>
        <div className="mt-4 flex gap-2">
          <Button type="button" variant="danger" onClick={() => pendingDelete && remove.mutate(pendingDelete._id)}>
            Delete
          </Button>
          <Button type="button" variant="outline" onClick={() => setPendingDelete(null)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}

function columnsFor(resource: string, sample?: Row) {
  const preferred: Record<string, string[]> = {
    courses: ['title', 'level', 'status', 'fee'],
    categories: ['name', 'slug'],
    students: ['fullName', 'email', 'course'],
    enrollments: ['fullName', 'email', 'course', 'paymentStatus'],
    inquiries: ['name', 'email', 'subject'],
    instructors: ['name', 'designation'],
    projects: ['title', 'category'],
    events: ['title', 'type', 'date'],
    blog: ['title', 'category', 'publishedAt'],
    testimonials: ['name', 'placeholder'],
    faqs: ['question'],
    settings: ['key', 'value'],
  };
  if (preferred[resource]) return preferred[resource];
  return sample ? Object.keys(sample).filter((key) => key !== '_v' && key !== '__v').slice(0, 4) : ['_id'];
}

function renderCell(value: unknown) {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'boolean') return <Badge tone={value ? 'warning' : 'default'}>{String(value)}</Badge>;
  if (typeof value === 'object') return JSON.stringify(value).slice(0, 40);
  const text = String(value);
  if (['published', 'pending', 'paid'].includes(text)) return <Badge tone="primary">{text}</Badge>;
  return text;
}

function ResourceForm({
  resource,
  initial,
  onSubmit,
  busy,
}: {
  resource: string;
  initial: Record<string, unknown>;
  onSubmit: (payload: Record<string, unknown>) => void;
  busy: boolean;
}) {
  const [draft, setDraft] = useState(() => JSON.stringify(pickWritable(resource, initial), null, 2));
  const [title, setTitle] = useState(String(initial.title ?? initial.name ?? initial.question ?? initial.fullName ?? ''));

  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        try {
          const parsed = JSON.parse(draft) as Record<string, unknown>;
          if (title && !parsed.title && !parsed.name && !parsed.question) {
            parsed.title = title;
          }
          onSubmit(parsed);
        } catch {
          toast.error('JSON is invalid');
        }
      }}
    >
      <Input label="Label" value={title} onChange={(event) => setTitle(event.target.value)} />
      <Textarea label="Record JSON" value={draft} onChange={(event) => setDraft(event.target.value)} rows={12} />
      <Button type="submit" disabled={busy}>
        {busy ? 'Saving…' : 'Save'}
      </Button>
    </form>
  );
}

function pickWritable(resource: string, initial: Record<string, unknown>) {
  const clone = { ...initial };
  delete clone._id;
  delete clone.__v;
  delete clone.createdAt;
  delete clone.updatedAt;
  if (resource === 'courses' && !clone.title) {
    return {
      title: 'New course',
      slug: 'new-course',
      shortDescription: 'Editable course summary',
      description: 'Replace this description.',
      level: 'Beginner',
      duration: '8 Weeks',
      durationWeeks: 8,
      totalHours: 60,
      classCount: 40,
      mode: 'Hybrid',
      projectCount: 2,
      fee: 'Fee on enquiry',
      feeAmount: 0,
      skills: [],
      tools: [],
      projects: [],
      prerequisites: [],
      certificate: 'Certificate details will be confirmed at enrolment.',
      curriculum: [],
      faqs: [],
      relatedSlugs: [],
      featured: false,
      status: 'draft',
    };
  }
  return clone;
}
