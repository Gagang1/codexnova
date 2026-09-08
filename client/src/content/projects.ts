import type { Project } from '@/types';

export const projects: Project[] = [
  {
    _id: 'p1',
    title: 'Campus Operations Dashboard',
    slug: 'campus-operations-dashboard',
    category: 'Data Analytics',
    technologies: ['Python', 'Pandas', 'Power BI'],
    shortDescription: 'Clean messy operational data and present a decision-ready dashboard.',
    description:
      'Learners ingest a synthetic campus dataset, resolve quality issues, define metrics, and publish a dashboard with a written insight memo. Replace this description with a published student/staff case when available.',
    outcomes: ['Metric definitions', 'Data quality notes', 'Stakeholder summary'],
  },
  {
    _id: 'p2',
    title: 'SQL Case: Enrolment Insights',
    slug: 'sql-enrolment-insights',
    category: 'SQL',
    technologies: ['SQL', 'PostgreSQL'],
    shortDescription: 'Write joins and aggregations that answer enrolment questions.',
    description:
      'A guided SQL project using fictional enrolment tables. Students practise grouping, window functions intro, and documenting assumptions.',
    outcomes: ['Reusable query pack', 'Schema notes'],
  },
  {
    _id: 'p3',
    title: 'Python Automation Toolkit',
    slug: 'python-automation-toolkit',
    category: 'Python',
    technologies: ['Python', 'Git'],
    shortDescription: 'A small suite of scripts that remove repetitive student/admin tasks.',
    description:
      'Build file organisers, CSV cleaners, and a CLI entry point. Emphasis on readable functions, error handling, and README quality.',
    outcomes: ['CLI tool', 'Tests or checks', 'README'],
  },
  {
    _id: 'p4',
    title: 'Power BI Sales Narrative',
    slug: 'power-bi-sales-narrative',
    category: 'Power BI',
    technologies: ['Power BI', 'Power Query', 'DAX'],
    shortDescription: 'Model a sales dataset and tell a clear performance story.',
    description:
      'Students model relationships, create measures, and design a report that a manager could actually use. Dataset is sample/synthetic.',
    outcomes: ['pbix-style report', 'Measure dictionary'],
  },
  {
    _id: 'p5',
    title: 'Classical ML Baseline',
    slug: 'classical-ml-baseline',
    category: 'Machine Learning',
    technologies: ['Python', 'scikit-learn'],
    shortDescription: 'Train a baseline model with honest validation and an error analysis.',
    description:
      'A classification or regression case with leakage checks, a simple baseline, and a model card. No production-performance claims.',
    outcomes: ['Notebook', 'Model card', 'Error analysis'],
  },
  {
    _id: 'p6',
    title: 'Applied AI Knowledge Assistant',
    slug: 'applied-ai-knowledge-assistant',
    category: 'AI',
    technologies: ['Python', 'API tooling'],
    shortDescription: 'A small Q&A workflow over a bounded course handbook.',
    description:
      'Learners design prompts/evals for a domain assistant using a provided corpus. Focus on evaluation and failure cases, not hype.',
    outcomes: ['Eval set', 'Prototype', 'Limitations write-up'],
  },
  {
    _id: 'p7',
    title: 'Responsive Course Catalogue',
    slug: 'responsive-course-catalogue',
    category: 'Web Development',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    shortDescription: 'An accessible, mobile-first catalogue with filters.',
    description:
      'Build semantic markup, keyboard-friendly filters, and layouts that hold from 320px to 1440px.',
    outcomes: ['Live page', 'Accessibility notes'],
  },
  {
    _id: 'p8',
    title: 'MERN Enrolment Platform',
    slug: 'mern-enrolment-platform',
    category: 'Full Stack',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
    shortDescription: 'A complete enrolment flow with auth-ready architecture.',
    description:
      'Capstone-style product: public pages, forms, APIs, and an admin shell. Payment can be stubbed for later Razorpay/Stripe work.',
    outcomes: ['Deployed app', 'API docs', 'Admin CRUD'],
  },
];
