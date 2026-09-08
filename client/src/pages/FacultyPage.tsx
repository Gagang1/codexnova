import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Seo } from '@/components/ui/Seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { catalogService } from '@/services/catalog';
import { PageLoader } from '@/components/ui/PageLoader';

export default function FacultyPage() {
  const query = useQuery({ queryKey: ['instructors'], queryFn: catalogService.instructors });
  if (query.isLoading) return <PageLoader />;

  return (
    <>
      <Seo
        title="Faculty"
        description="Meet CodeXNova instructors and mentors. Profiles are editable placeholders until credentials are published."
        path="/faculty"
      />
      <div className="container-cxn py-10 md:py-14">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Faculty' }]} />
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">Faculty</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Do not treat placeholder names as real people. Replace these records with verified instructor data.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {(query.data ?? []).map((person) => (
            <article key={person._id} className="border border-border bg-surface-elevated p-5">
              <div className="mb-4 flex h-40 items-end bg-[linear-gradient(160deg,#1e3a8a,#2563eb)] p-4">
                <span className="font-mono text-xs text-white/80">Profile image pending</span>
              </div>
              <h2 className="text-lg font-bold text-ink">
                <Link to={`/faculty/${person.slug}`} className="hover:text-primary">
                  {person.name}
                </Link>
              </h2>
              <p className="text-sm text-primary">{person.designation}</p>
              <p className="mt-2 text-sm text-muted">{person.expertise.join(' · ')}</p>
              <p className="mt-2 text-xs text-muted">{person.experience}</p>
              <p className="mt-3 text-sm text-muted">{person.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
