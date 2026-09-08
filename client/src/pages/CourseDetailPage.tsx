import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Seo } from '@/components/ui/Seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { EmptyState } from '@/components/ui/EmptyState';
import { CourseCard } from '@/components/courses/CourseCard';
import { catalogService } from '@/services/catalog';
import { PageLoader } from '@/components/ui/PageLoader';

export default function CourseDetailPage() {
  const { slug = '' } = useParams();
  const courseQuery = useQuery({
    queryKey: ['course', slug],
    queryFn: () => catalogService.course(slug),
  });
  const all = useQuery({ queryKey: ['courses'], queryFn: () => catalogService.courses() });
  const course = courseQuery.data;

  if (courseQuery.isLoading) return <PageLoader />;
  if (!course) {
    return (
      <div className="container-cxn py-16">
        <EmptyState title="Course not found" description="This programme is not in the catalogue." actionLabel="Browse courses" actionTo="/courses" />
      </div>
    );
  }

  const related = (all.data ?? []).filter((item) => course.relatedSlugs.includes(item.slug));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.shortDescription,
    provider: { '@type': 'EducationalOrganization', name: 'Codex Nova' },
  };

  return (
    <>
      <Seo title={course.title} description={course.shortDescription} path={`/courses/${course.slug}`} jsonLd={jsonLd} />
      <div className="bg-ink text-white">
        <div className="container-cxn py-10 md:py-14">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Courses', to: '/courses' },
              { label: course.title },
            ]}
          />
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge tone="primary">{course.category.name}</Badge>
            <Badge>{course.level}</Badge>
            <Badge>{course.mode}</Badge>
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight md:text-4xl">{course.title}</h1>
          <p className="mt-4 max-w-2xl text-white/70">{course.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to={`/enroll?course=${course.slug}`} size="lg">
              Enroll Now
            </Button>
            <Button to="/contact" variant="outline" size="lg" className="border-white/20 bg-transparent text-white hover:text-white">
              Talk to a Mentor
            </Button>
          </div>
        </div>
      </div>

      <div className="container-cxn grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-ink">Curriculum</h2>
            <ol className="mt-4 space-y-5">
              {course.curriculum.map((module, index) => (
                <li key={module.title} className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-soft">
                  <p className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                    Module {index + 1}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-ink">{module.title}</h3>
                  <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                    {module.topics.map((topic) => (
                      <li key={topic} className="flex gap-2 text-sm text-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/70" aria-hidden />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-ink">Skills covered</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {course.skills.map((skill) => (
                <li key={skill} className="border border-border px-3 py-1.5 text-sm">
                  {skill}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-ink">Tools & technologies</h2>
            <p className="mt-2 text-sm text-muted">{course.tools.join(', ')}</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-ink">Projects</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              {course.projects.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-ink">Prerequisites</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              {course.prerequisites.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-ink">Certificate</h2>
            <p className="mt-2 text-sm text-muted">{course.certificate}</p>
          </section>
          {course.faqs.length ? (
            <section>
              <h2 className="mb-4 text-2xl font-bold text-ink">FAQs</h2>
              <Accordion items={course.faqs} />
            </section>
          ) : null}
          {related.length ? (
            <section>
              <h2 className="mb-4 text-2xl font-bold text-ink">Related courses</h2>
              <div className="grid gap-5 md:grid-cols-2">
                {related.map((item) => (
                  <CourseCard key={item._id} course={item} />
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="h-fit border border-border bg-surface-elevated p-5 lg:sticky lg:top-24">
          <dl className="space-y-3 text-sm">
            <Row label="Duration" value={course.duration} />
            <Row label="Total hours" value={`${course.totalHours} Hours`} />
            <Row label="Classes" value={String(course.classCount)} />
            <Row label="Level" value={course.level} />
            <Row label="Mode" value={course.mode} />
            <Row label="Projects" value={String(course.projectCount)} />
            <Row label="Fee" value={course.fee} />
            <Row
              label="Instructor"
              value={
                course.instructor ? (
                  course.instructor.name
                  /* Faculty page link — restore with public faculty routes
                  <Link to={`/faculty/${course.instructor.slug}`} className="text-primary hover:underline">
                    {course.instructor.name}
                  </Link>
                  */
                ) : (
                  'To be announced'
                )
              }
            />
          </dl>
          <Button to={`/enroll?course=${course.slug}`} fullWidth className="mt-6">
            Enroll Now
          </Button>
        </aside>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between gap-3 border-b border-border pb-3">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}
