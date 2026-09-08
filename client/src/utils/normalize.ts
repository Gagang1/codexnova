import type { Category, Course, Instructor } from '@/types';

function asString(value: unknown, fallback = '') {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  return fallback;
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.map((item) => asString(item)).filter(Boolean) : [];
}

export function normalizeCategory(raw: unknown): Category {
  const item = (raw ?? {}) as Record<string, unknown>;
  return {
    _id: asString(item._id ?? item.id, 'category'),
    name: asString(item.name, 'Uncategorised'),
    slug: asString(item.slug, 'uncategorised'),
    description: asString(item.description),
  };
}

export function normalizeInstructor(raw: unknown): Instructor | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const item = raw as Record<string, unknown>;
  const social = (item.social ?? {}) as Record<string, unknown>;
  return {
    _id: asString(item._id ?? item.id, 'instructor'),
    name: asString(item.name, 'Instructor'),
    slug: asString(item.slug, 'instructor'),
    designation: asString(item.designation),
    expertise: asStringArray(item.expertise),
    experience: asString(item.experience),
    bio: asString(item.bio),
    image: asString(item.image) || undefined,
    social: {
      linkedin: asString(social.linkedin) || undefined,
      github: asString(social.github) || undefined,
      website: asString(social.website) || undefined,
    },
  };
}

export function normalizeCourse(raw: unknown): Course {
  const item = (raw ?? {}) as Record<string, unknown>;
  const category =
    item.category && typeof item.category === 'object'
      ? normalizeCategory(item.category)
      : normalizeCategory({ name: 'Programming', slug: 'programming' });

  return {
    _id: asString(item._id ?? item.id, 'course'),
    title: asString(item.title, 'Untitled course'),
    slug: asString(item.slug, 'untitled-course'),
    shortDescription: asString(item.shortDescription),
    description: asString(item.description),
    category,
    level: (asString(item.level, 'Beginner') as Course['level']),
    duration: asString(item.duration, 'TBD'),
    durationWeeks: Number(item.durationWeeks) || 1,
    totalHours: Number(item.totalHours) || 0,
    classCount: Number(item.classCount) || 0,
    mode: (asString(item.mode, 'Hybrid') as Course['mode']),
    projectCount: Number(item.projectCount) || 0,
    fee: asString(item.fee, 'Fee on enquiry'),
    feeAmount: Number(item.feeAmount) || 0,
    skills: asStringArray(item.skills),
    tools: asStringArray(item.tools),
    projects: asStringArray(item.projects),
    prerequisites: asStringArray(item.prerequisites),
    certificate: asString(item.certificate),
    curriculum: Array.isArray(item.curriculum)
      ? (item.curriculum as Course['curriculum'])
      : [],
    faqs: Array.isArray(item.faqs) ? (item.faqs as Course['faqs']) : [],
    instructor: normalizeInstructor(item.instructor),
    relatedSlugs: asStringArray(item.relatedSlugs),
    featured: Boolean(item.featured),
    status: (asString(item.status, 'published') as Course['status']),
  };
}

export function normalizeCourses(raw: unknown): Course[] {
  return Array.isArray(raw) ? raw.map(normalizeCourse) : [];
}

export function normalizeInstructors(raw: unknown): Instructor[] {
  return Array.isArray(raw)
    ? raw.map((item) => normalizeInstructor(item)).filter((item): item is Instructor => Boolean(item))
    : [];
}
