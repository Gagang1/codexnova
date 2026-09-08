import { api } from '@/api/client';
import { courses as localCourses, categories as localCategories, instructors as localInstructors } from '@/content/courses';
import { projects as localProjects } from '@/content/projects';
import { events as localEvents } from '@/content/events';
import { blogPosts as localPosts } from '@/content/blog';
import { faqs as localFaqs } from '@/content/siteContent';
import type { BlogPost, Category, Project } from '@/types';
import { normalizeCourse, normalizeCourses, normalizeInstructors } from '@/utils/normalize';

type ListParams = Record<string, string | number | undefined>;

async function getOrLocal<T>(path: string, fallback: T, params?: ListParams): Promise<T> {
  try {
    const { data } = await api.get(path, { params });
    const payload = data?.data ?? data;
    if (Array.isArray(payload) && payload.length === 0) return fallback;
    if (payload) return payload as T;
    return fallback;
  } catch {
    return fallback;
  }
}

export const catalogService = {
  courses: async () => normalizeCourses(localCourses),
  course: async (slug: string) => {
    const local = localCourses.find((item) => item.slug === slug);
    return local ? normalizeCourse(local) : null;
  },
  categories: () => getOrLocal<Category[]>('/categories', localCategories, { limit: 50 }),
  instructors: async () => {
    const payload = await getOrLocal<unknown[]>('/instructors', localInstructors, { limit: 50 });
    return normalizeInstructors(payload);
  },
  instructor: async (slug: string) => {
    try {
      const { data } = await api.get(`/instructors/${slug}`);
      return normalizeInstructors([data?.data ?? data])[0] ?? null;
    } catch {
      return localInstructors.find((item) => item.slug === slug) ?? null;
    }
  },
  projects: () => getOrLocal<Project[]>('/projects', localProjects, { limit: 50 }),
  project: async (slug: string) => {
    try {
      const { data } = await api.get(`/projects/${slug}`);
      return (data?.data ?? data) as Project;
    } catch {
      return localProjects.find((item) => item.slug === slug) ?? null;
    }
  },
  events: async () => localEvents,
  event: async (slug: string) => localEvents.find((item) => item.slug === slug) ?? null,
  posts: () => getOrLocal<BlogPost[]>('/blog', localPosts, { limit: 50 }),
  post: async (slug: string) => {
    try {
      const { data } = await api.get(`/blog/${slug}`);
      return (data?.data ?? data) as BlogPost;
    } catch {
      return localPosts.find((item) => item.slug === slug) ?? null;
    }
  },
  faqs: async () => localFaqs,
};
