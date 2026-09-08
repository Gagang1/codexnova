import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Seo } from '@/components/ui/Seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageLoader } from '@/components/ui/PageLoader';
import { catalogService } from '@/services/catalog';

export default function ProjectDetailPage() {
  const { slug = '' } = useParams();
  const query = useQuery({ queryKey: ['project', slug], queryFn: () => catalogService.project(slug) });
  if (query.isLoading) return <PageLoader />;
  const project = query.data;
  if (!project) {
    return (
      <div className="container-cxn py-16">
        <EmptyState title="Project not found" description="This studio brief is not published." actionLabel="View projects" actionTo="/projects" />
      </div>
    );
  }

  return (
    <>
      <Seo title={project.title} description={project.shortDescription} path={`/projects/${project.slug}`} />
      <div className="container-cxn py-10 md:py-14">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Projects', to: '/projects' }, { label: project.title }]} />
        <div className="mt-6 h-48 bg-[linear-gradient(135deg,#0f172a_0%,#2563eb_55%,#06b6d4_100%)] md:h-72" />
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-primary">{project.category}</p>
        <h1 className="mt-2 text-3xl font-extrabold text-ink md:text-4xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-muted">{project.description}</p>
        <p className="mt-4 text-sm text-ink">
          <span className="font-semibold">Technologies:</span> {project.technologies.join(', ')}
        </p>
        <h2 className="mt-8 text-xl font-bold text-ink">Outcomes</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
          {project.outcomes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
