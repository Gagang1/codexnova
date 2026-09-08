import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Seo } from '@/components/ui/Seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { catalogService } from '@/services/catalog';
import { PageLoader } from '@/components/ui/PageLoader';

const courseSlugByEvent: Record<string, string> = {
  'c-language-batch-starting-soon': 'c',
  'cpp-language-batch-starting-soon': 'cpp',
  'java-language-batch-starting-soon': 'java',
  'python-language-batch-starting-soon': 'python',
};

export default function EventsPage() {
  const query = useQuery({ queryKey: ['events'], queryFn: catalogService.events });
  if (query.isLoading) return <PageLoader />;

  return (
    <>
      <Seo
        title="Events"
        description="Upcoming Codex Nova batches for C, C++, Java, and Python."
        path="/events"
      />
      <div className="container-cxn py-10 md:py-14">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Events' }]} />
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">Upcoming batches</h1>
        <p className="mt-3 max-w-2xl text-muted">
          New batches are opening soon. Enroll now and we will share the exact start details.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {(query.data ?? []).map((event) => {
            const courseSlug = courseSlugByEvent[event.slug] ?? '';
            return (
              <article
                key={event._id}
                className="hover-lift flex h-full flex-col rounded-2xl border border-border bg-surface-elevated p-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="secondary">{event.type}</Badge>
                  <Badge tone="primary">Starting Soon</Badge>
                </div>
                <h2 className="mt-4 text-lg font-bold text-ink">
                  <Link to={`/events/${event.slug}`} className="transition-colors hover:text-primary">
                    {event.title}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 text-sm text-muted">{event.description}</p>
                <p className="mt-3 text-xs text-muted">
                  {event.mode} · {event.location}
                </p>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <Button to={courseSlug ? `/enroll?course=${courseSlug}` : '/enroll'} size="sm" className="flex-1">
                    Enroll Now
                  </Button>
                  <Button to={`/events/${event.slug}`} variant="outline" size="sm" className="flex-1">
                    View details
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
