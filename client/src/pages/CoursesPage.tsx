import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { Seo } from '@/components/ui/Seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { EmptyState } from '@/components/ui/EmptyState';
import { Pagination } from '@/components/ui/Pagination';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { CourseCard } from '@/components/courses/CourseCard';
import { catalogService } from '@/services/catalog';
import { useCourseCatalog } from '@/hooks/useCourseCatalog';
import { categories } from '@/content/courses';

export default function CoursesPage() {
  const query = useQuery({ queryKey: ['courses'], queryFn: () => catalogService.courses() });
  const courses = query.data ?? [];
  const catalog = useCourseCatalog(courses);

  return (
    <>
      <Seo
        title="Courses"
        description="Explore Codex Nova courses in Python, SQL, C, C++, Java, web, React JS, Power BI, Excel, and Office tools."
        path="/courses"
      />
      <div className="border-b border-border bg-[linear-gradient(180deg,#eef3fb,var(--color-surface))]">
        <div className="container-cxn py-10 md:py-14">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Courses' }]} />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">Courses</h1>
          <p className="mt-3 max-w-2xl text-muted">
            Simple, practical courses for students from different educational backgrounds. Ask us for current fees and batch dates.
          </p>
        </div>
      </div>

      <div className="container-cxn py-10">
        <form
          className="mb-8 grid gap-3 md:grid-cols-2 lg:grid-cols-6"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="relative lg:col-span-2">
            <span className="sr-only">Search courses</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={catalog.filters.q}
              onChange={(event) => catalog.update('q', event.target.value)}
              placeholder="Search courses"
              className="min-h-11 w-full rounded-lg border border-border bg-surface-elevated pl-9 pr-3"
            />
          </label>
          <select
            aria-label="Category"
            className="min-h-11 rounded-lg border border-border bg-surface-elevated px-3"
            value={catalog.filters.category}
            onChange={(event) => catalog.update('category', event.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            aria-label="Level"
            className="min-h-11 rounded-lg border border-border bg-surface-elevated px-3"
            value={catalog.filters.level}
            onChange={(event) => catalog.update('level', event.target.value)}
          >
            <option value="">All levels</option>
            <option>Beginner</option>
            <option>Beginner to Intermediate</option>
            <option>Beginner to Advanced</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <select
            aria-label="Duration"
            className="min-h-11 rounded-lg border border-border bg-surface-elevated px-3"
            value={catalog.filters.duration}
            onChange={(event) => catalog.update('duration', event.target.value)}
          >
            <option value="">Any duration</option>
            <option value="short">Up to 8 weeks</option>
            <option value="medium">9–12 weeks</option>
            <option value="long">13+ weeks</option>
          </select>
          <select
            aria-label="Learning mode"
            className="min-h-11 rounded-lg border border-border bg-surface-elevated px-3"
            value={catalog.filters.mode}
            onChange={(event) => catalog.update('mode', event.target.value)}
          >
            <option value="">Any mode</option>
            <option>Online</option>
          </select>
          <select
            aria-label="Sort"
            className="min-h-11 rounded-lg border border-border bg-surface-elevated px-3 md:col-span-2 lg:col-span-1"
            value={catalog.filters.sort}
            onChange={(event) => catalog.update('sort', event.target.value as typeof catalog.filters.sort)}
          >
            <option value="featured">Featured</option>
            <option value="title">Title</option>
            <option value="duration">Duration</option>
          </select>
        </form>

        {query.isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : catalog.total === 0 ? (
          <EmptyState
            title="No courses match those filters"
            description="Clear a filter or browse the full catalogue."
            actionLabel="Reset view"
            actionTo="/courses"
          />
        ) : (
          <>
            <p className="mb-4 text-sm text-muted">{catalog.total} programmes</p>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {catalog.paged.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
            <div className="mt-10">
              <Pagination page={catalog.page} pageCount={catalog.pageCount} onPageChange={catalog.setPage} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
