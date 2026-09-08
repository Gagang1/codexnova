import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Seo } from '@/components/ui/Seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { catalogService } from '@/services/catalog';
import { PageLoader } from '@/components/ui/PageLoader';

const blogCategories = [
  'All',
  'Python',
  'SQL',
  'Data Analytics',
  'AI',
  'Machine Learning',
  'Power BI',
  'Programming',
  'Engineering',
  'Career',
  'Placement',
];

export default function BlogPage() {
  const query = useQuery({ queryKey: ['blog'], queryFn: catalogService.posts });
  const [category, setCategory] = useState('All');
  const posts = useMemo(() => {
    const items = query.data ?? [];
    if (category === 'All') return items;
    return items.filter((post) => post.category === category);
  }, [query.data, category]);

  if (query.isLoading) return <PageLoader />;

  return (
    <>
      <Seo
        title="Blog"
        description="Simple learning notes from Codex Nova on Python, SQL, analytics, and careers."
        path="/blog"
      />
      <div className="container-cxn py-10 md:py-14">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Blog' }]} />
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">Blog</h1>
        <p className="mt-3 max-w-2xl text-muted">Short, practical notes for students who want to learn technology skills.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {blogCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`min-h-10 rounded-lg border px-3 text-sm font-medium ${
                category === item ? 'border-primary bg-primary text-white' : 'border-border bg-surface-elevated'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post._id} className="border-t-2 border-primary pt-5">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{post.category}</p>
              <h2 className="mt-2 text-xl font-bold text-ink">
                <Link to={`/blog/${post.slug}`} className="hover:text-primary">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
              <p className="mt-3 text-xs text-muted">
                {post.author} · {post.publishedAt} · {post.readingTime}
              </p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
