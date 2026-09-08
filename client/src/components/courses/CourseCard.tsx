import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Course } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CategoryMark } from '@/components/courses/CategoryMark';

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="hover-lift flex h-full flex-col rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft">
      <div className="mb-4 flex items-start justify-between gap-3">
        <CategoryMark name={course.category.name} />
        <Badge tone="primary">{course.level}</Badge>
      </div>
      <h3 className="text-lg font-bold tracking-tight text-ink sm:text-[1.15rem]">
        <Link to={`/courses/${course.slug}`} className="transition-colors duration-200 hover:text-primary">
          {course.title}
        </Link>
      </h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{course.shortDescription}</p>
      <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted">
        <div>
          <dt className="font-semibold text-ink">Duration</dt>
          <dd>{course.duration}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">Total hours</dt>
          <dd>{course.totalHours} Hours</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">Classes</dt>
          <dd>{course.classCount}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">Mode</dt>
          <dd>{course.mode}</dd>
        </div>
      </dl>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <Button to={`/courses/${course.slug}`} variant="outline" size="sm" className="flex-1">
          View Course
          <ArrowUpRight className="h-4 w-4" />
        </Button>
        <Button to={`/enroll?course=${course.slug}`} size="sm" className="flex-1">
          Enroll Now
        </Button>
      </div>
    </article>
  );
}
