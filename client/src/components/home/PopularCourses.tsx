import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Course } from '@/types';
import { CourseCard } from '@/components/courses/CourseCard';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';

const HOME_COURSE_COUNT = 6;

export function PopularCourses({ courses }: { courses: Course[] }) {
  const preview = courses.slice(0, HOME_COURSE_COUNT);
  const hasMore = courses.length > HOME_COURSE_COUNT;

  return (
    <Section tone="white">
      <div className="mb-2">
        <SectionHeading
          eyebrow="Catalogue"
          title="Courses you can start with"
          description="Learn practical skills step by step. Ask us for current fees and batch details."
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {preview.map((course, index) => (
          <Reveal key={course._id} delay={Math.min(index * 0.04, 0.28)} className="h-full">
            <CourseCard course={course} />
          </Reveal>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          Want help choosing a course?{' '}
          <Link to="/contact" className="font-semibold text-primary transition-colors hover:underline">
            Talk to a mentor
          </Link>
          .
        </p>
        {hasMore ? (
          <Button to="/courses" variant="outline" size="md" className="shrink-0">
            View more
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : null}
      </div>
    </Section>
  );
}
