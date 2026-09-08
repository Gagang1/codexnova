import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Seo } from '@/components/ui/Seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageLoader } from '@/components/ui/PageLoader';
import { catalogService } from '@/services/catalog';

export default function EventDetailPage() {
  const { slug = '' } = useParams();
  const query = useQuery({ queryKey: ['event', slug], queryFn: () => catalogService.event(slug) });
  if (query.isLoading) return <PageLoader />;
  const event = query.data;
  if (!event) {
    return (
      <div className="container-cxn py-16">
        <EmptyState title="Event not found" description="This event is not on the calendar." actionLabel="View events" actionTo="/events" />
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    eventAttendanceMode:
      event.mode === 'Online'
        ? 'https://schema.org/OnlineEventAttendanceMode'
        : 'https://schema.org/OfflineEventAttendanceMode',
    location: event.location,
  };

  return (
    <>
      <Seo title={event.title} description={event.description} path={`/events/${event.slug}`} jsonLd={jsonLd} />
      <div className="container-cxn py-10 md:py-14">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Events', to: '/events' }, { label: event.title }]} />
        <Badge className="mt-6" tone="secondary">
          {event.type}
        </Badge>
        <Badge className="mt-6 ml-2" tone="primary">
          Starting Soon
        </Badge>
        <h1 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">{event.title}</h1>
        <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted">Date</dt>
            <dd className="font-medium text-ink">{event.date}</dd>
          </div>
          <div>
            <dt className="text-muted">Time</dt>
            <dd className="font-medium text-ink">{event.time}</dd>
          </div>
          <div>
            <dt className="text-muted">Location</dt>
            <dd className="font-medium text-ink">{event.location}</dd>
          </div>
          <div>
            <dt className="text-muted">Mode</dt>
            <dd className="font-medium text-ink">{event.mode}</dd>
          </div>
          <div>
            <dt className="text-muted">Speaker</dt>
            <dd className="font-medium text-ink">{event.speaker}</dd>
          </div>
        </dl>
        <p className="mt-6 max-w-2xl text-muted">{event.description}</p>
        <div className="mt-8">
          <Button
            to={
              event.registrationOpen
                ? `/enroll?course=${
                    {
                      'c-language-batch-starting-soon': 'c',
                      'cpp-language-batch-starting-soon': 'cpp',
                      'java-language-batch-starting-soon': 'java',
                      'python-language-batch-starting-soon': 'python',
                    }[event.slug] ?? ''
                  }`
                : '/contact'
            }
            disabled={!event.registrationOpen}
          >
            {event.registrationOpen ? 'Enroll Now' : 'Registration closed'}
          </Button>
        </div>
      </div>
    </>
  );
}
