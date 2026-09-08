import type { Category, Course, Instructor } from '@/types';

export const categories: Category[] = [
  { _id: 'cat-programming', name: 'Programming', slug: 'programming', description: 'Learn to write programs step by step.' },
  { _id: 'cat-database', name: 'Database', slug: 'database', description: 'Store, find, and understand data with SQL.' },
  { _id: 'cat-web', name: 'Web Development', slug: 'web-development', description: 'Build websites and web apps.' },
  { _id: 'cat-ms', name: 'Microsoft Tools', slug: 'microsoft-tools', description: 'Excel, Power BI, and Office skills for study and work.' },
];

export const instructors: Instructor[] = [
  {
    _id: 'ins-1',
    name: 'Codex Nova Mentor',
    slug: 'codex-nova-mentor',
    designation: 'Mentor',
    expertise: ['Python', 'SQL', 'Web Development'],
    experience: 'Mentors at Codex Nova help you learn by doing.',
    bio: 'You will learn with guided practice, projects, and clear feedback.',
    social: {},
  },
];

type CourseInput = Omit<
  Course,
  'instructor' | 'status' | 'fee' | 'feeAmount' | 'certificate' | 'mode' | 'featured'
> & {
  featured?: boolean;
};

function course(input: CourseInput): Course {
  return {
    ...input,
    mode: 'Online',
    fee: 'Fee on enquiry',
    feeAmount: 0,
    certificate: 'Certificate details will be shared when you enroll.',
    instructor: instructors[0],
    featured: input.featured ?? true,
    status: 'published',
  };
}

const python = course({
  _id: 'c-python',
  title: 'Python Programming',
  slug: 'python',
  shortDescription:
    'Learn Python from fundamentals to practical programming, including problem-solving, OOP, file handling, and databases.',
  description:
    'Learn Python from fundamentals to practical programming, including problem-solving, functions, object-oriented programming, file handling, and working with databases. Build real mini projects such as a Student Management System or Expense Tracker.',
  category: categories[0],
  level: 'Beginner to Intermediate',
  duration: '8 Weeks',
  durationWeeks: 8,
  totalHours: 60,
  classCount: 40,
  projectCount: 2,
  skills: [
    'Python fundamentals',
    'Control flow',
    'Data structures',
    'Functions',
    'OOP',
    'File & CSV handling',
    'APIs & databases',
  ],
  tools: ['Python', 'VS Code', 'SQLite / DB connectivity'],
  projects: ['Student Management System', 'Expense Tracker'],
  prerequisites: ['A computer and a willingness to practise. No prior coding experience required.'],
  curriculum: [
    {
      title: 'Python Fundamentals',
      topics: [
        'Introduction to Python',
        'Installing Python and setting up IDE',
        'Python syntax and indentation',
        'Variables and constants',
        'Data types',
        'Type conversion',
        'Input and output',
        'Operators',
        'Comments and coding conventions',
      ],
    },
    {
      title: 'Control Flow',
      topics: [
        'Conditional statements',
        'if, elif, else',
        'Nested conditions',
        'for loops',
        'while loops',
        'break, continue, pass',
        'Practical problem-solving exercises',
      ],
    },
    {
      title: 'Python Data Structures',
      topics: [
        'Strings',
        'Lists',
        'Tuples',
        'Sets',
        'Dictionaries',
        'Indexing and slicing',
        'Common built-in methods',
        'Nested data structures',
      ],
    },
    {
      title: 'Functions',
      topics: [
        'Defining functions',
        'Parameters and arguments',
        'Return values',
        'Default and keyword arguments',
        'Scope of variables',
        'Lambda functions',
        'Recursion',
        'Built-in functions',
      ],
    },
    {
      title: 'Advanced Python',
      topics: [
        'Modules and packages',
        'Exception handling',
        'File handling',
        'Reading and writing CSV files',
        'Object-Oriented Programming',
        'Classes and objects',
        'Inheritance',
        'Encapsulation and polymorphism',
      ],
    },
    {
      title: 'Practical Python',
      topics: [
        'Working with dates and time',
        'Regular expressions',
        'JSON handling',
        'Introduction to APIs',
        'Database connectivity',
        'Mini project',
      ],
    },
  ],
  faqs: [
    {
      question: 'Is this only for engineering students?',
      answer: 'No. Students from any background can join. We start from the basics.',
    },
  ],
  relatedSlugs: ['sql', 'excel-basic-to-advanced', 'java'],
});

const sql = course({
  _id: 'c-sql',
  title: 'SQL & Database Fundamentals',
  slug: 'sql',
  shortDescription:
    'Master database concepts and SQL — from creating tables to joins, views, and practical reporting projects.',
  description:
    'Build strong database foundations with DBMS concepts, SQL queries, joins, functions, and advanced topics like views, indexes, and transactions. Finish with a practical relational database project such as Employee or Inventory Management.',
  category: categories[1],
  level: 'Beginner to Intermediate',
  duration: '6 Weeks',
  durationWeeks: 6,
  totalHours: 45,
  classCount: 30,
  projectCount: 2,
  skills: [
    'Database design',
    'SQL queries',
    'Joins & subqueries',
    'Aggregate functions',
    'Views & indexes',
    'Transactions',
  ],
  tools: ['SQL', 'PostgreSQL / MySQL'],
  projects: ['Employee Management Database', 'Inventory Management Database'],
  prerequisites: ['Basic computer use is enough.'],
  curriculum: [
    {
      title: 'Database Fundamentals',
      topics: [
        'What is a database?',
        'DBMS vs RDBMS',
        'Tables, rows and columns',
        'Primary keys',
        'Foreign keys',
        'Relationships',
        'Database normalization',
        'Introduction to SQL',
      ],
    },
    {
      title: 'SQL Basics',
      topics: [
        'Creating databases and tables',
        'CREATE',
        'INSERT',
        'SELECT',
        'UPDATE',
        'DELETE',
        'WHERE',
        'ORDER BY',
        'DISTINCT',
      ],
    },
    {
      title: 'SQL Functions & Filtering',
      topics: [
        'Aggregate functions',
        'COUNT, SUM, AVG, MIN, MAX',
        'GROUP BY',
        'HAVING',
        'Logical operators',
        'LIKE, IN, BETWEEN',
      ],
    },
    {
      title: 'SQL Joins',
      topics: [
        'Inner Join',
        'Left Join',
        'Right Join',
        'Full Join',
        'Self Join',
        'Multiple-table queries',
        'Subqueries',
      ],
    },
    {
      title: 'Advanced SQL',
      topics: [
        'Views',
        'Indexes',
        'Constraints',
        'Stored procedures',
        'Transactions',
        'Basic database security',
        'Query optimization',
      ],
    },
    {
      title: 'Practical Database Project',
      topics: [
        'Database design',
        'Creating relational tables',
        'Writing queries',
        'Data insertion and reporting',
      ],
    },
  ],
  faqs: [],
  relatedSlugs: ['python', 'power-bi', 'excel-basic-to-advanced'],
});

const cLang = course({
  _id: 'c-c',
  title: 'C Programming Essentials',
  slug: 'c',
  shortDescription:
    'Learn C from fundamentals through arrays, pointers, structures, and file handling with a hands-on project.',
  description:
    'Build a solid foundation in C programming — program structure, decision making, loops, arrays, strings, functions, pointers, structures, and file handling. Complete a Student Record Management System project.',
  category: categories[0],
  level: 'Beginner',
  duration: '6 Weeks',
  durationWeeks: 6,
  totalHours: 45,
  classCount: 30,
  projectCount: 1,
  skills: [
    'C syntax',
    'Decision making & loops',
    'Arrays & strings',
    'Functions & pointers',
    'Structures & files',
    'Problem-solving',
  ],
  tools: ['C', 'VS Code'],
  projects: ['Student Record Management System'],
  prerequisites: ['No coding experience needed.'],
  curriculum: [
    {
      title: 'C Fundamentals',
      topics: [
        'Introduction to C',
        'C program structure',
        'Compilation and execution',
        'Variables and data types',
        'Constants',
        'Input/output',
        'Operators',
      ],
    },
    {
      title: 'Decision Making & Loops',
      topics: [
        'if / if-else',
        'Nested conditions',
        'switch',
        'for / while / do-while',
        'Pattern programming',
      ],
    },
    {
      title: 'Arrays & Strings',
      topics: [
        'One-dimensional arrays',
        'Multi-dimensional arrays',
        'Strings',
        'String functions',
        'Searching',
        'Sorting',
      ],
    },
    {
      title: 'Functions & Pointers',
      topics: [
        'Functions',
        'Function arguments',
        'Recursion',
        'Pointers',
        'Pointer arithmetic',
        'Call by value/reference',
      ],
    },
    {
      title: 'Structures & Files',
      topics: [
        'Structures',
        'Unions',
        'Enumerations',
        'File handling',
        'Reading and writing files',
        'Dynamic memory allocation',
      ],
    },
    {
      title: 'Project',
      topics: ['Problem-solving', 'Debugging', 'Project development'],
    },
  ],
  faqs: [],
  relatedSlugs: ['cpp', 'java', 'python'],
});

const cpp = course({
  _id: 'c-cpp',
  title: 'C++ Programming Mastery',
  slug: 'cpp',
  shortDescription:
    'Learn C++ from basics to OOP, STL, file handling, and exceptions — then build a real application project.',
  description:
    'Progress from C++ fundamentals to object-oriented programming, advanced OOP, the Standard Template Library, file handling, and exception handling. Finish with a Banking System or Library Management System project.',
  category: categories[0],
  level: 'Beginner to Intermediate',
  duration: '6.8 Weeks',
  durationWeeks: 6.8,
  totalHours: 50,
  classCount: 34,
  projectCount: 2,
  skills: [
    'C++ fundamentals',
    'Functions & arrays',
    'Object-Oriented Programming',
    'Advanced OOP',
    'STL',
    'File handling & exceptions',
  ],
  tools: ['C++', 'VS Code'],
  projects: ['Banking System', 'Library Management System'],
  prerequisites: ['C basics are helpful, but beginners can still join.'],
  curriculum: [
    {
      title: 'C++ Fundamentals',
      topics: [
        'Introduction to C++',
        'C vs C++',
        'Variables and data types',
        'Operators',
        'Input/output',
        'Conditional statements',
        'Loops',
      ],
    },
    {
      title: 'Functions & Arrays',
      topics: [
        'Functions',
        'Function overloading',
        'Arrays',
        'Strings',
        'References',
        'Pointers',
      ],
    },
    {
      title: 'Object-Oriented Programming',
      topics: [
        'Classes and objects',
        'Constructors',
        'Destructors',
        'Encapsulation',
        'Inheritance',
        'Polymorphism',
        'Abstraction',
      ],
    },
    {
      title: 'Advanced OOP',
      topics: [
        'Single inheritance',
        'Multiple inheritance',
        'Multilevel inheritance',
        'Virtual functions',
        'Abstract classes',
        'Friend functions',
      ],
    },
    {
      title: 'STL',
      topics: [
        'Standard Template Library',
        'Vectors',
        'Lists',
        'Stacks',
        'Queues',
        'Maps',
        'Iterators',
        'Algorithms',
      ],
    },
    {
      title: 'File Handling & Exceptions',
      topics: ['File streams', 'Reading/writing files', 'Exception handling', 'Templates'],
    },
    {
      title: 'Project',
      topics: ['Banking System', 'Library Management System'],
    },
  ],
  faqs: [],
  relatedSlugs: ['c', 'java', 'python'],
});

const java = course({
  _id: 'c-java',
  title: 'Java Programming',
  slug: 'java',
  shortDescription:
    'Learn Java from fundamentals through OOP, collections, multithreading, and JDBC with a full application project.',
  description:
    'Master Java programming — JDK/JRE/JVM basics, control statements, OOP, exception handling, collections, file handling, multithreading, lambda expressions, streams, and JDBC. Build a Student Management or Banking Application.',
  category: categories[0],
  level: 'Beginner to Intermediate',
  duration: '8 Weeks',
  durationWeeks: 8,
  totalHours: 60,
  classCount: 40,
  projectCount: 2,
  skills: [
    'Java fundamentals',
    'Control statements',
    'OOP in Java',
    'Exception handling',
    'Collections',
    'Multithreading & JDBC',
  ],
  tools: ['Java', 'JDK', 'VS Code / IntelliJ'],
  projects: ['Student Management Application', 'Banking Application'],
  prerequisites: ['No prior Java experience required.'],
  curriculum: [
    {
      title: 'Java Fundamentals',
      topics: [
        'Introduction to Java',
        'JDK, JRE and JVM',
        'Installing Java',
        'First Java program',
        'Variables',
        'Data types',
        'Operators',
        'Input/output',
      ],
    },
    {
      title: 'Control Statements',
      topics: ['Conditional statements', 'Loops', 'Nested loops', 'switch', 'Arrays', 'Strings'],
    },
    {
      title: 'OOP in Java',
      topics: [
        'Classes and objects',
        'Constructors',
        'Methods',
        'Encapsulation',
        'Inheritance',
        'Polymorphism',
        'Abstraction',
        'Interfaces',
      ],
    },
    {
      title: 'Exception Handling',
      topics: ['Exceptions', 'try-catch', 'finally', 'throw', 'throws', 'Custom exceptions'],
    },
    {
      title: 'Collections',
      topics: ['ArrayList', 'LinkedList', 'HashSet', 'HashMap', 'Iterators', 'Generics'],
    },
    {
      title: 'Advanced Java',
      topics: [
        'File handling',
        'Multithreading',
        'Packages',
        'Lambda expressions',
        'Streams',
        'JDBC fundamentals',
      ],
    },
    {
      title: 'Project (Weeks 7–8)',
      topics: ['Student Management Application', 'Banking Application'],
    },
  ],
  faqs: [],
  relatedSlugs: ['python', 'cpp', 'c'],
});

const html = course({
  _id: 'c-html',
  title: 'HTML Web Development',
  slug: 'html',
  shortDescription:
    'Learn HTML structure, forms, semantic markup, and accessibility — then build a personal portfolio website.',
  description:
    'Start web development with HTML fundamentals, page components, semantic elements, accessibility, SEO-friendly structure, and responsive page layouts. Complete a Personal Portfolio Website project.',
  category: categories[2],
  level: 'Beginner',
  duration: '3.6 Weeks',
  durationWeeks: 3.6,
  totalHours: 26,
  classCount: 18,
  projectCount: 1,
  skills: [
    'HTML structure',
    'Forms & inputs',
    'Semantic HTML',
    'Accessibility basics',
    'SEO-friendly structure',
  ],
  tools: ['HTML', 'VS Code'],
  projects: ['Personal Portfolio Website'],
  prerequisites: ['No web experience needed.'],
  curriculum: [
    {
      title: 'HTML Fundamentals',
      topics: [
        'Introduction to web development',
        'How websites work',
        'HTML structure',
        'Elements and tags',
        'Headings',
        'Paragraphs',
        'Links',
        'Images',
      ],
    },
    {
      title: 'HTML Components',
      topics: [
        'Lists',
        'Tables',
        'Forms',
        'Input fields',
        'Buttons',
        'Dropdowns',
        'Radio buttons',
        'Checkboxes',
      ],
    },
    {
      title: 'Semantic HTML',
      topics: [
        'Semantic elements',
        'Header',
        'Navigation',
        'Main',
        'Section',
        'Article',
        'Footer',
        'Accessibility basics',
      ],
    },
    {
      title: 'Practical Development',
      topics: [
        'Embedding multimedia',
        'HTML best practices',
        'SEO-friendly structure',
        'Responsive page structure',
        'Website project',
      ],
    },
  ],
  faqs: [],
  relatedSlugs: ['css', 'javascript', 'tailwind-css'],
});

const css = course({
  _id: 'c-css',
  title: 'CSS & Web Styling',
  slug: 'css',
  shortDescription:
    'Style modern websites with CSS — box model, Flexbox, Grid, responsive design, and animations.',
  description:
    'Learn CSS from fundamentals through the box model, Flexbox, CSS Grid, media queries, transitions, animations, and CSS variables. Build a Responsive Business Website as your final project.',
  category: categories[2],
  level: 'Beginner to Intermediate',
  duration: '4 Weeks',
  durationWeeks: 4,
  totalHours: 30,
  classCount: 20,
  projectCount: 1,
  skills: [
    'CSS fundamentals',
    'Box model',
    'Flexbox & Grid',
    'Responsive design',
    'Transitions & animations',
  ],
  tools: ['CSS', 'VS Code'],
  projects: ['Responsive Business Website'],
  prerequisites: ['HTML basics are helpful.'],
  curriculum: [
    {
      title: 'CSS Fundamentals',
      topics: [
        'Introduction to CSS',
        'Inline, internal and external CSS',
        'Selectors',
        'Colors',
        'Fonts',
        'Text styling',
        'Backgrounds',
      ],
    },
    {
      title: 'CSS Box Model',
      topics: [
        'Margin',
        'Padding',
        'Border',
        'Width and height',
        'Display properties',
        'Positioning',
      ],
    },
    {
      title: 'Modern Layout',
      topics: ['Flexbox', 'CSS Grid', 'Alignment', 'Responsive layouts', 'Media queries'],
    },
    {
      title: 'Advanced Styling',
      topics: [
        'Transitions',
        'Transformations',
        'Animations',
        'Pseudo-classes',
        'Pseudo-elements',
        'CSS variables',
      ],
    },
    {
      title: 'Project',
      topics: ['Responsive Business Website'],
    },
  ],
  faqs: [],
  relatedSlugs: ['html', 'javascript', 'tailwind-css'],
});

const javascript = course({
  _id: 'c-js',
  title: 'JavaScript Development',
  slug: 'javascript',
  shortDescription:
    'Learn JavaScript from basics to DOM, ES6+, async programming, and real interactive web projects.',
  description:
    'Cover JavaScript fundamentals, programming logic, DOM manipulation, modern ES6+ features, promises, async/await, Fetch API, and local storage. Build a Calculator, To-Do App, Weather App, and an interactive website.',
  category: categories[2],
  level: 'Beginner to Intermediate',
  duration: '8 Weeks',
  durationWeeks: 8,
  totalHours: 60,
  classCount: 40,
  projectCount: 4,
  skills: [
    'JavaScript fundamentals',
    'DOM manipulation',
    'ES6+ features',
    'Async / Fetch API',
    'Local storage',
  ],
  tools: ['JavaScript', 'VS Code', 'Browser DevTools'],
  projects: ['Calculator', 'To-Do Application', 'Weather Application', 'Interactive website'],
  prerequisites: ['HTML and CSS basics are helpful.'],
  curriculum: [
    {
      title: 'JavaScript Fundamentals',
      topics: [
        'Introduction to JavaScript',
        'Variables',
        'Data types',
        'Operators',
        'Type conversion',
        'Input/output',
      ],
    },
    {
      title: 'Programming Logic',
      topics: [
        'Conditions',
        'Loops',
        'Functions',
        'Arrow functions',
        'Scope',
        'Arrays',
        'Objects',
      ],
    },
    {
      title: 'DOM Manipulation',
      topics: [
        'What is DOM?',
        'Selecting elements',
        'Changing HTML/CSS',
        'Events',
        'Event listeners',
        'Form handling',
      ],
    },
    {
      title: 'Modern JavaScript',
      topics: [
        'Destructuring',
        'Spread/rest operators',
        'Template literals',
        'Modules',
        'ES6+ features',
      ],
    },
    {
      title: 'Advanced JavaScript',
      topics: [
        'Promises',
        'Async/await',
        'Fetch API',
        'JSON',
        'Error handling',
        'Local storage',
      ],
    },
    {
      title: 'Projects (Weeks 6–8)',
      topics: ['Calculator', 'To-Do Application', 'Weather Application', 'Interactive website'],
    },
  ],
  faqs: [],
  relatedSlugs: ['html', 'css', 'react-js'],
});

const tailwind = course({
  _id: 'c-tw',
  title: 'Tailwind CSS & Modern UI',
  slug: 'tailwind-css',
  shortDescription:
    'Build modern UIs faster with Tailwind — utilities, responsive layouts, components, and dark mode.',
  description:
    'Learn utility-first CSS with Tailwind — typography, spacing, Flexbox, Grid, responsive breakpoints, reusable UI components, hover/focus states, dark mode, and UI optimization. Project: Modern Responsive Landing Page.',
  category: categories[2],
  level: 'Intermediate',
  duration: '4 Weeks',
  durationWeeks: 4,
  totalHours: 30,
  classCount: 20,
  projectCount: 1,
  skills: [
    'Utility-first CSS',
    'Responsive design',
    'UI components',
    'Dark mode',
    'Modern UI principles',
  ],
  tools: ['Tailwind CSS', 'HTML', 'VS Code'],
  projects: ['Modern Responsive Landing Page'],
  prerequisites: ['HTML and CSS basics are helpful.'],
  curriculum: [
    {
      title: 'Tailwind Fundamentals',
      topics: [
        'Introduction to Tailwind CSS',
        'Utility-first CSS',
        'Installation and configuration',
        'Typography',
        'Colors',
        'Spacing',
      ],
    },
    {
      title: 'Layout & Responsive Design',
      topics: [
        'Flexbox',
        'Grid',
        'Responsive design',
        'Breakpoints',
        'Containers',
        'Positioning',
      ],
    },
    {
      title: 'UI Components',
      topics: [
        'Cards',
        'Buttons',
        'Forms',
        'Navigation bars',
        'Modals',
        'Components',
        'Hover and focus states',
      ],
    },
    {
      title: 'Modern UI & Project',
      topics: [
        'Modern UI principles',
        'Responsive layouts',
        'Dark mode',
        'Component-based design',
        'UI optimization',
        'Modern Responsive Landing Page',
      ],
    },
  ],
  faqs: [],
  relatedSlugs: ['html', 'css', 'react-js'],
});

const reactJs = course({
  _id: 'c-react',
  title: 'React JS Frontend Development',
  slug: 'react-js',
  shortDescription:
    'Build modern React apps with components, hooks, routing, APIs, and a full dashboard project.',
  description:
    'Learn React from fundamentals through state, events, hooks, component architecture, Context API, React Router, API integration, and advanced concepts like performance and protected routes. Project: E-Commerce Dashboard or Student Portal.',
  category: categories[2],
  level: 'Intermediate',
  duration: '8 Weeks',
  durationWeeks: 8,
  totalHours: 60,
  classCount: 40,
  projectCount: 2,
  skills: [
    'React components & JSX',
    'State & events',
    'React Hooks',
    'Context API',
    'Routing & APIs',
    'Performance basics',
  ],
  tools: ['React JS', 'JavaScript', 'Vite', 'React Router'],
  projects: ['E-Commerce Dashboard', 'Student Portal'],
  prerequisites: ['JavaScript basics are recommended.'],
  curriculum: [
    {
      title: 'React Fundamentals',
      topics: [
        'Introduction to React',
        'React ecosystem',
        'Setting up React',
        'Components',
        'JSX',
        'Props',
      ],
    },
    {
      title: 'State & Events',
      topics: ['State', 'Event handling', 'Conditional rendering', 'Lists', 'Forms'],
    },
    {
      title: 'React Hooks',
      topics: ['useState', 'useEffect', 'useRef', 'Custom hooks'],
    },
    {
      title: 'Application Structure',
      topics: [
        'Component architecture',
        'Reusable components',
        'Props drilling',
        'Context API',
      ],
    },
    {
      title: 'Routing & APIs',
      topics: [
        'React Router',
        'API integration',
        'Fetch/Axios concepts',
        'Loading and error states',
      ],
    },
    {
      title: 'Advanced React',
      topics: [
        'Performance optimization',
        'State management concepts',
        'Authentication concepts',
        'Protected routes',
      ],
    },
    {
      title: 'Project (Weeks 7–8)',
      topics: ['E-Commerce Dashboard', 'Student Portal'],
    },
  ],
  faqs: [],
  relatedSlugs: ['javascript', 'html', 'tailwind-css'],
});

const powerbi = course({
  _id: 'c-pbi',
  title: 'Power BI & Data Visualization',
  slug: 'power-bi',
  shortDescription:
    'Turn raw data into interactive dashboards with Power Query, data modeling, DAX, and visuals.',
  description:
    'Learn Power BI Desktop, data import, Power Query cleaning, data modeling, DAX measures, and interactive visualizations. Complete a Sales & Business Performance Dashboard project.',
  category: categories[3],
  level: 'Beginner to Intermediate',
  duration: '5.4 Weeks',
  durationWeeks: 5.4,
  totalHours: 40,
  classCount: 27,
  projectCount: 1,
  skills: [
    'Power BI Desktop',
    'Power Query',
    'Data modeling',
    'DAX',
    'Interactive dashboards',
  ],
  tools: ['Power BI', 'Excel', 'CSV / Database connections'],
  projects: ['Sales & Business Performance Dashboard'],
  prerequisites: ['Comfort with Excel is helpful, but not required.'],
  curriculum: [
    {
      title: 'Power BI Fundamentals',
      topics: [
        'Introduction to Power BI',
        'Power BI Desktop',
        'Importing data',
        'Excel/CSV/database connections',
        'Data types',
      ],
    },
    {
      title: 'Power Query',
      topics: [
        'Data cleaning',
        'Removing duplicates',
        'Handling missing values',
        'Transforming columns',
        'Merging queries',
        'Appending data',
      ],
    },
    {
      title: 'Data Modeling',
      topics: [
        'Relationships',
        'Fact and dimension tables',
        'Star schema',
        'Calculated columns',
        'Measures',
      ],
    },
    {
      title: 'DAX',
      topics: [
        'DAX fundamentals',
        'Calculations',
        'SUM',
        'COUNT',
        'CALCULATE',
        'FILTER',
        'Time intelligence basics',
      ],
    },
    {
      title: 'Visualization',
      topics: [
        'Charts',
        'Tables',
        'Cards',
        'Slicers',
        'Filters',
        'Drill-down',
        'Interactive dashboards',
      ],
    },
    {
      title: 'Dashboard Project',
      topics: ['Sales & Business Performance Dashboard'],
    },
  ],
  faqs: [],
  relatedSlugs: ['excel-basic-to-advanced', 'sql', 'python'],
});

const excel = course({
  _id: 'c-excel',
  title: 'Microsoft Excel – Basic to Advanced',
  slug: 'excel-basic-to-advanced',
  shortDescription:
    'Go from Excel basics to advanced lookups, Pivot Tables, charts, and KPI dashboards.',
  description:
    'Cover Excel fundamentals, essential functions, data management, advanced lookups (VLOOKUP, XLOOKUP, INDEX & MATCH), Pivot Tables/Charts, and data visualization. Project: Sales & Employee Performance Dashboard.',
  category: categories[3],
  level: 'Beginner to Advanced',
  duration: '6 Weeks',
  durationWeeks: 6,
  totalHours: 45,
  classCount: 30,
  projectCount: 1,
  skills: [
    'Excel fundamentals',
    'Formulas & functions',
    'Data management',
    'Lookups & Pivot Tables',
    'Dashboard creation',
  ],
  tools: ['Microsoft Excel'],
  projects: ['Sales & Employee Performance Dashboard'],
  prerequisites: ['Basic computer use is enough.'],
  curriculum: [
    {
      title: 'Excel Fundamentals',
      topics: [
        'Excel interface',
        'Worksheets and workbooks',
        'Data entry',
        'Formatting',
        'Rows and columns',
        'Basic formulas',
      ],
    },
    {
      title: 'Excel Functions',
      topics: [
        'SUM, AVERAGE, COUNT, MAX/MIN',
        'IF, AND/OR, IFERROR',
        'Text functions',
        'Date functions',
      ],
    },
    {
      title: 'Data Management',
      topics: [
        'Sorting',
        'Filtering',
        'Conditional formatting',
        'Data validation',
        'Tables',
        'Remove duplicates',
      ],
    },
    {
      title: 'Advanced Excel',
      topics: [
        'VLOOKUP',
        'XLOOKUP',
        'INDEX & MATCH',
        'SUMIF/SUMIFS',
        'COUNTIF/COUNTIFS',
        'Pivot Tables',
        'Pivot Charts',
      ],
    },
    {
      title: 'Data Visualization',
      topics: [
        'Charts',
        'Interactive dashboards',
        'KPI reports',
        'Slicers',
        'Advanced formatting',
      ],
    },
    {
      title: 'Practical Project',
      topics: ['Sales & Employee Performance Dashboard'],
    },
  ],
  faqs: [],
  relatedSlugs: ['power-bi', 'office-automation', 'sql'],
});

const office = course({
  _id: 'c-office',
  title: 'Office Automation & Productivity',
  slug: 'office-automation',
  shortDescription:
    'Build digital office skills across Word, Excel, PowerPoint, email, and productivity workflows.',
  description:
    'Learn computer fundamentals, file management, cloud storage, email productivity, professional Word documents, Excel reporting, PowerPoint presentations, and office workflow automation concepts.',
  category: categories[3],
  level: 'Beginner to Advanced',
  duration: '4 Weeks',
  durationWeeks: 4,
  totalHours: 30,
  classCount: 20,
  projectCount: 3,
  skills: [
    'Digital office skills',
    'MS Word',
    'Excel productivity',
    'PowerPoint presentations',
    'Workflow automation concepts',
  ],
  tools: ['MS Word', 'MS Excel', 'MS PowerPoint'],
  projects: ['Formatted professional document', 'Excel productivity report', 'Business presentation deck'],
  prerequisites: ['No prior Office experience needed.'],
  curriculum: [
    {
      title: 'Digital Office Skills',
      topics: [
        'Computer fundamentals',
        'File and folder management',
        'Cloud storage',
        'Email management',
        'Internet productivity',
        'Keyboard shortcuts',
      ],
    },
    {
      title: 'Microsoft Word',
      topics: [
        'Professional document creation',
        'Formatting',
        'Styles',
        'Tables',
        'Headers and footers',
        'Page layout',
        'Templates',
      ],
    },
    {
      title: 'Excel Productivity',
      topics: [
        'Data management',
        'Formulas',
        'Reports',
        'Charts',
        'Pivot Tables',
        'Productivity shortcuts',
      ],
    },
    {
      title: 'PowerPoint & Automation',
      topics: [
        'Professional presentations',
        'Slide layouts',
        'Themes',
        'Animations',
        'Transitions',
        'Charts',
        'Presentation best practices',
        'Office workflow automation concepts',
      ],
    },
  ],
  faqs: [],
  relatedSlugs: ['ms-word', 'ms-excel', 'ms-powerpoint'],
});

const msWord = course({
  _id: 'c-ms-word',
  title: 'MS Word – Professional Documentation',
  slug: 'ms-word',
  shortDescription:
    'Create polished resumes, reports, letters, and professional documents in Microsoft Word.',
  description:
    'Master MS Word for professional documentation — formatting, styles, tables, mail merge, templates, table of contents, and PDF export. Practical projects include a resume, business letter, project report, certificate, and official notice.',
  category: categories[3],
  level: 'Beginner',
  duration: '2.8 Weeks',
  durationWeeks: 2.8,
  totalHours: 20,
  classCount: 14,
  projectCount: 5,
  skills: [
    'Document formatting',
    'Styles & themes',
    'Tables & SmartArt',
    'Mail Merge',
    'Professional reports',
  ],
  tools: ['MS Word'],
  projects: [
    'Professional Resume',
    'Business Letter',
    'Project Report',
    'Certificate',
    'Official Notice',
  ],
  prerequisites: ['Basic computer use is enough.'],
  curriculum: [
    {
      title: 'Word Interface & Document Creation',
      topics: [
        'Word interface and document creation',
        'Text formatting',
        'Paragraph formatting',
        'Styles and themes',
        'Page setup',
      ],
    },
    {
      title: 'Professional Layout Tools',
      topics: [
        'Headers and footers',
        'Tables',
        'Images and shapes',
        'SmartArt',
        'Page numbering',
        'Table of contents',
      ],
    },
    {
      title: 'Advanced Documents & Projects',
      topics: [
        'Mail Merge',
        'Templates',
        'Professional reports',
        'Resume/CV creation',
        'Printing and PDF export',
      ],
    },
  ],
  faqs: [],
  relatedSlugs: ['office-automation', 'ms-excel', 'ms-powerpoint'],
});

const msExcel = course({
  _id: 'c-ms-excel',
  title: 'MS Excel – Data & Office Skills',
  slug: 'ms-excel',
  shortDescription:
    'Dedicated Excel path from beginner through advanced analysis, Pivot Tables, and dashboards.',
  description:
    'A dedicated Excel course covering beginner, intermediate, and advanced skills — formulas, lookups, Pivot Tables, filtering, and dashboard creation. Projects include attendance sheets, salary calculators, sales reports, inventory management, and business dashboards.',
  category: categories[3],
  level: 'Beginner to Advanced',
  duration: '6 Weeks',
  durationWeeks: 6,
  totalHours: 45,
  classCount: 30,
  projectCount: 5,
  skills: [
    'Beginner Excel',
    'Intermediate functions',
    'Advanced lookups',
    'Pivot Tables & Charts',
    'Dashboard creation',
  ],
  tools: ['MS Excel'],
  projects: [
    'Employee Attendance Sheet',
    'Salary Calculator',
    'Sales Report',
    'Inventory Management',
    'Business Dashboard',
  ],
  prerequisites: ['Basic computer use is enough.'],
  curriculum: [
    {
      title: 'Beginner Excel',
      topics: [
        'Interface',
        'Data entry',
        'Formatting',
        'Basic formulas',
        'Basic functions',
      ],
    },
    {
      title: 'Intermediate Excel',
      topics: [
        'IF functions',
        'Text functions',
        'Date functions',
        'Lookup functions',
        'Data validation',
        'Conditional formatting',
      ],
    },
    {
      title: 'Advanced Excel',
      topics: [
        'XLOOKUP',
        'INDEX/MATCH',
        'Pivot Tables',
        'Pivot Charts',
        'Advanced filtering',
        'Dashboard creation',
        'Data analysis',
      ],
    },
    {
      title: 'Practical Projects',
      topics: [
        'Employee Attendance Sheet',
        'Salary Calculator',
        'Sales Report',
        'Inventory Management',
        'Business Dashboard',
      ],
    },
  ],
  faqs: [],
  relatedSlugs: ['excel-basic-to-advanced', 'office-automation', 'power-bi'],
});

const msPowerPoint = course({
  _id: 'c-ms-ppt',
  title: 'MS PowerPoint – Presentation Design',
  slug: 'ms-powerpoint',
  shortDescription:
    'Design and deliver professional presentations with layouts, visuals, animations, and Slide Master.',
  description:
    'Learn PowerPoint from fundamentals through design, SmartArt, charts, animations, Slide Master, Presenter View, and delivery skills. Projects include business, educational, product, and portfolio presentations.',
  category: categories[3],
  level: 'Beginner',
  duration: '2.8 Weeks',
  durationWeeks: 2.8,
  totalHours: 20,
  classCount: 14,
  projectCount: 4,
  skills: [
    'Presentation fundamentals',
    'Visual design',
    'Animations & transitions',
    'Slide Master',
    'Presentation delivery',
  ],
  tools: ['MS PowerPoint'],
  projects: [
    'Business Presentation',
    'Educational Presentation',
    'Product Presentation',
    'Professional Portfolio Presentation',
  ],
  prerequisites: ['Basic computer use is enough.'],
  curriculum: [
    {
      title: 'Presentation Fundamentals',
      topics: [
        'PowerPoint interface',
        'Creating presentations',
        'Slide layouts',
        'Themes',
        'Templates',
        'Text formatting',
      ],
    },
    {
      title: 'Designing Presentations',
      topics: [
        'Images',
        'Shapes',
        'Icons',
        'SmartArt',
        'Tables',
        'Charts',
        'Infographics',
        'Slide alignment',
        'Visual hierarchy',
      ],
    },
    {
      title: 'Advanced Presentation Skills',
      topics: [
        'Animations',
        'Transitions',
        'Slide Master',
        'Interactive presentations',
        'Presenter View',
        'Presentation delivery',
        'Exporting presentations',
      ],
    },
  ],
  faqs: [],
  relatedSlugs: ['office-automation', 'ms-word', 'ms-excel'],
});

export const courses: Course[] = [
  python,
  sql,
  cLang,
  cpp,
  java,
  html,
  css,
  javascript,
  tailwind,
  reactJs,
  powerbi,
  excel,
  office,
  msWord,
  msExcel,
  msPowerPoint,
];

export const courseSelectOptions = courses.map((item) => ({
  value: item.slug,
  label:
    item.slug === 'office-automation'
      ? 'Office Automation & Productivity (MS Word, MS Excel, MS PowerPoint)'
      : item.title,
}));
