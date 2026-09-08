import type { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    _id: 'b1',
    title: 'How students can actually learn Python',
    slug: 'how-engineering-students-should-learn-python',
    excerpt:
      'Skip the endless tutorial loop. Learn Python by writing small tools that solve problems you already have.',
    category: 'Python',
    author: 'Codex Nova Faculty',
    publishedAt: '2026-06-12',
    readingTime: '7 min',
    seoTitle: 'How students can learn Python | Codex Nova',
    metaDescription:
      'A practical way for students to learn Python through projects, not only videos.',
    headings: [
      { id: 'start-small', text: 'Start smaller than you think' },
      { id: 'projects', text: 'Projects beat playlists' },
      { id: 'review', text: 'Get your code reviewed' },
    ],
    content: `## Start smaller than you think

The fastest way to stall in Python is to collect courses without making anything. Pick one repetitive task from your studies — renaming files, cleaning a CSV, or making a simple chart — and automate it.

## Projects beat playlists

A 40-hour playlist without a repository is not a skill. Publish a README, show inputs and outputs, and write what broke. Interviewers can interrogate a project. They cannot interrogate a completion certificate.

## Get your code reviewed

Working code can still be unclear. Mentorship at Codex Nova is built around review: naming, structure, error handling, and whether a teammate could run your script. That is the difference between "I watched Python" and "I can write Python."`,
  },
  {
    _id: 'b2',
    title: 'SQL is a career skill, not a database elective',
    slug: 'sql-is-a-career-skill',
    excerpt: 'If you can join tables and define a metric, you become useful in almost any internship.',
    category: 'SQL',
    author: 'Codex Nova Faculty',
    publishedAt: '2026-06-20',
    readingTime: '6 min',
    seoTitle: 'Why students should learn SQL | Codex Nova',
    metaDescription:
      'SQL helps students analyse data, support internships, and communicate with clarity.',
    headings: [
      { id: 'why-sql', text: 'Why SQL shows up everywhere' },
      { id: 'practice', text: 'How to practise without a job' },
    ],
    content: `## Why SQL shows up everywhere

Internships in analytics, product, operations, and backend engineering all assume you can ask a database a precise question. Spreadsheets run out of steam. SQL is the shared language.

## How to practise without a job

Use public sample schemas or class datasets. Write the question in English first, then the query. Keep a notebook of joins that surprised you. That notebook becomes interview material.`,
  },
  {
    _id: 'b3',
    title: 'A simple analytics workflow for college projects',
    slug: 'simple-analytics-workflow-college-projects',
    excerpt: 'Question, data, quality, metric, chart, caveat. Repeat.',
    category: 'Data Analytics',
    author: 'Codex Nova Faculty',
    publishedAt: '2026-07-02',
    readingTime: '8 min',
    seoTitle: 'Analytics workflow for college projects | Codex Nova',
    metaDescription:
      'A six-step analytics workflow students can apply to mini-projects and internships.',
    headings: [
      { id: 'workflow', text: 'The six steps' },
      { id: 'charts', text: 'Charts that argue' },
    ],
    content: `## The six steps

1. Write the decision you want to inform.
2. Name the data you actually have.
3. Record quality issues instead of hiding them.
4. Define one metric that matches the decision.
5. Draw one chart that changes a mind.
6. Add a caveat. Serious analysts always do.

## Charts that argue

If a chart needs a paragraph of apology, pick a simpler encoding. Titles should state the finding, not the chart type.`,
  },
  {
    _id: 'b4',
    title: 'Machine learning without the myth',
    slug: 'machine-learning-without-the-myth',
    excerpt: 'Baselines, leakage, and evaluation matter more than fashionable algorithms.',
    category: 'Machine Learning',
    author: 'Codex Nova Faculty',
    publishedAt: '2026-07-18',
    readingTime: '9 min',
    seoTitle: 'Machine learning without the myth | Codex Nova',
    metaDescription:
      'What students should focus on first when learning machine learning.',
    headings: [
      { id: 'baseline', text: 'Beat a baseline' },
      { id: 'leakage', text: 'Respect leakage' },
    ],
    content: `## Beat a baseline

If a mean predictor or a simple heuristic is already good, your neural net is theatre. Always report the dumb answer first.

## Respect leakage

Future information in training data makes campus demos look brilliant and internships look embarrassing. Split in time when the problem is temporal. Document what the model is allowed to know.`,
  },
  {
    _id: 'b5',
    title: 'Preparing for internships as a student',
    slug: 'preparing-for-internships-engineering-student',
    excerpt: 'Signal is a repository, a write-up, and the ability to explain trade-offs.',
    category: 'Career',
    author: 'Codex Nova Faculty',
    publishedAt: '2026-08-01',
    readingTime: '7 min',
    seoTitle: 'Internship preparation for students | Codex Nova',
    metaDescription:
      'Practical internship preparation for students: projects, writing, and interviews.',
    headings: [
      { id: 'signal', text: 'What actually counts as signal' },
      { id: 'interviews', text: 'Interview practice that transfers' },
    ],
    content: `## What actually counts as signal

A polished résumé with empty projects is weak. One repository with a clear problem, your approach, and screenshots is strong. Codex Nova career help is built around that work.

## Interview practice that transfers

Explain a project out loud for five minutes. Then answer "what would you do differently?". That pair covers more internships than trivia drills alone.`,
  },
];
