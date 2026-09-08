import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Linkedin, Github, Globe } from 'lucide-react';
import { Seo } from '@/components/ui/Seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageLoader } from '@/components/ui/PageLoader';
import { catalogService } from '@/services/catalog';

export default function FacultyDetailPage() {
  const { slug = '' } = useParams();
  const query = useQuery({ queryKey: ['instructor', slug], queryFn: () => catalogService.instructor(slug) });
  if (query.isLoading) return <PageLoader />;
  const person = query.data;
  if (!person) {
    return (
      <div className="container-cxn py-16">
        <EmptyState title="Faculty profile not found" description="This instructor page is not published." actionLabel="View faculty" actionTo="/faculty" />
      </div>
    );
  }

  return (
    <>
      <Seo title={person.name} description={person.bio} path={`/faculty/${person.slug}`} />
      <div className="container-cxn py-10 md:py-14">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Faculty', to: '/faculty' }, { label: person.name }]} />
        <div className="mt-8 grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <div className="flex h-56 items-end bg-[linear-gradient(160deg,#1e3a8a,#2563eb,#06b6d4)] p-4">
            <span className="font-mono text-xs text-white/80">Profile image pending</span>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-ink">{person.name}</h1>
            <p className="mt-2 text-primary">{person.designation}</p>
            <p className="mt-4 max-w-2xl text-muted">{person.bio}</p>
            <p className="mt-4 text-sm text-muted">
              <span className="font-semibold text-ink">Expertise:</span> {person.expertise.join(', ')}
            </p>
            <p className="mt-2 text-sm text-muted">
              <span className="font-semibold text-ink">Experience:</span> {person.experience}
            </p>
            <div className="mt-6 flex gap-2">
              <Social href={person.social.linkedin} label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Social>
              <Social href={person.social.github} label="GitHub">
                <Github className="h-5 w-5" />
              </Social>
              <Social href={person.social.website} label="Website">
                <Globe className="h-5 w-5" />
              </Social>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Social({ href, label, children }: { href?: string; label: string; children: ReactNode }) {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border hover:border-primary">
      {children}
    </a>
  );
}
