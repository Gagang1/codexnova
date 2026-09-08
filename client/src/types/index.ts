export type CourseLevel =
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced'
  | 'Beginner to Intermediate'
  | 'Beginner to Advanced';
export type LearningMode = 'Online' | 'Offline' | 'Hybrid';
export type CourseStatus = 'draft' | 'published' | 'archived';

export type Category = {
  _id: string;
  name: string;
  slug: string;
  description: string;
};

export type Instructor = {
  _id: string;
  name: string;
  slug: string;
  designation: string;
  expertise: string[];
  experience: string;
  bio: string;
  image?: string;
  social: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
};

export type CurriculumModule = {
  title: string;
  topics: string[];
};

export type Course = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: Category;
  level: CourseLevel;
  duration: string;
  durationWeeks: number;
  totalHours: number;
  classCount: number;
  mode: LearningMode;
  projectCount: number;
  fee: string;
  feeAmount: number;
  skills: string[];
  tools: string[];
  projects: string[];
  prerequisites: string[];
  certificate: string;
  curriculum: CurriculumModule[];
  faqs: { question: string; answer: string }[];
  instructor?: Instructor;
  relatedSlugs: string[];
  featured: boolean;
  status: CourseStatus;
};

export type Project = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  technologies: string[];
  shortDescription: string;
  description: string;
  outcomes: string[];
  image?: string;
};

export type EventItem = {
  _id: string;
  title: string;
  slug: string;
  type: 'workshop' | 'seminar' | 'webinar' | 'hackathon' | 'bootcamp' | 'career';
  date: string;
  time: string;
  location: string;
  mode: LearningMode;
  description: string;
  speaker: string;
  registrationOpen: boolean;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  seoTitle: string;
  metaDescription: string;
  coverImage?: string;
  headings: { id: string; text: string }[];
};

export type Testimonial = {
  _id: string;
  name: string;
  role: string;
  quote: string;
  placeholder: boolean;
};

export type Faq = {
  _id: string;
  question: string;
  answer: string;
  audience: 'general' | 'course';
};
