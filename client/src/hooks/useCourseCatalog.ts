import { useMemo, useState } from 'react';
import type { Course, CourseLevel, LearningMode } from '@/types';

export type CourseFilters = {
  q: string;
  category: string;
  level: string;
  duration: string;
  mode: string;
  sort: 'featured' | 'title' | 'duration';
};

const pageSize = 9;

export function useCourseCatalog(courses: Course[]) {
  const [filters, setFilters] = useState<CourseFilters>({
    q: '',
    category: '',
    level: '',
    duration: '',
    mode: '',
    sort: 'featured',
  });
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = courses.filter((course) => course.status !== 'archived');
    const query = filters.q.trim().toLowerCase();
    if (query) {
      result = result.filter((course) =>
        `${course.title} ${course.shortDescription} ${course.category.name}`.toLowerCase().includes(query),
      );
    }
    if (filters.category) result = result.filter((course) => course.category.slug === filters.category);
    if (filters.level) result = result.filter((course) => course.level === (filters.level as CourseLevel));
    if (filters.mode) result = result.filter((course) => course.mode === (filters.mode as LearningMode));
    if (filters.duration === 'short') result = result.filter((course) => course.durationWeeks <= 8);
    if (filters.duration === 'medium') {
      result = result.filter((course) => course.durationWeeks > 8 && course.durationWeeks <= 12);
    }
    if (filters.duration === 'long') result = result.filter((course) => course.durationWeeks > 12);

    result = [...result].sort((a, b) => {
      if (filters.sort === 'title') return a.title.localeCompare(b.title);
      if (filters.sort === 'duration') return a.durationWeeks - b.durationWeeks;
      return Number(b.featured) - Number(a.featured);
    });
    return result;
  }, [courses, filters]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const paged = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  function update<K extends keyof CourseFilters>(key: K, value: CourseFilters[K]) {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  }

  return { filters, update, page: safePage, setPage, pageCount, paged, total: filtered.length };
}
