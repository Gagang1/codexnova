import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Seo } from '@/components/ui/Seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { catalogService } from '@/services/catalog';
import { PageLoader } from '@/components/ui/PageLoader';

export default function ProjectsPage() {
  const query = useQuery({ queryKey: ['projects'], queryFn: catalogService.projects });
  if (query.isLoading) return <PageLoader />;

  return (
    <>
      <Seo
        title="Projects"
        description="Practical CodeXNova studio projects across Python, SQL, analytics, AI, and full stack."
        path="/projects"
      />
      <div className="container-cxn py-10 md:py-14">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Projects' }]} />
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">Projects</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Studio briefs learners complete during programmes. Replace with published student work when you have consent.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(query.data ?? []).map((project) => (
            <article key={project._id} className="flex flex-col border border-border bg-surface-elevated p-5">
              <div className="mb-4 h-32 bg-[linear-gradient(135deg,#0f172a_0%,#2563eb_55%,#06b6d4_100%)]" />
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{project.category}</p>
              <h2 className="mt-2 text-lg font-bold text-ink">
                <Link to={`/projects/${project.slug}`} className="hover:text-primary">
                  {project.title}
                </Link>
              </h2>
              <p className="mt-2 flex-1 text-sm text-muted">{project.shortDescription}</p>
              <p className="mt-3 text-xs text-muted">{project.technologies.join(' · ')}</p>
              <div className="mt-4">
                <Button to={`/projects/${project.slug}`} variant="outline" size="sm">
                  View Project
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
