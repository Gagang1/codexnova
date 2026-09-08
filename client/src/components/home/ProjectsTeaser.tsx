import { Link } from 'react-router-dom';
import type { Project } from '@/types';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export function ProjectsTeaser({ projects }: { projects: Project[] }) {
  return (
    <Section tone="white">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Practical projects"
          title="What learners actually make."
          description="Sample studio briefs. Swap in published student work from the admin when you have permission to share it."
        />
        <Button to="/projects" variant="outline">
          View projects
        </Button>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
          <article key={project._id} className="border-t-2 border-primary pt-5">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{project.category}</p>
            <h3 className="mt-2 text-lg font-bold text-ink">
              <Link to={`/projects/${project.slug}`} className="hover:text-primary">
                {project.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm text-muted">{project.shortDescription}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
