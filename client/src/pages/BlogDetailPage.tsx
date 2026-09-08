import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Seo } from '@/components/ui/Seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageLoader } from '@/components/ui/PageLoader';
import { catalogService } from '@/services/catalog';
import { renderMarkdown } from '@/utils/markdown';
import { siteConfig } from '@/config/site';

export default function BlogDetailPage() {
  const { slug = '' } = useParams();
  const query = useQuery({ queryKey: ['post', slug], queryFn: () => catalogService.post(slug) });
  const all = useQuery({ queryKey: ['blog'], queryFn: catalogService.posts });
  if (query.isLoading) return <PageLoader />;
  const post = query.data;
  if (!post) {
    return (
      <div className="container-cxn py-16">
        <EmptyState title="Article not found" description="This post is not published." actionLabel="Back to blog" actionTo="/blog" />
      </div>
    );
  }

  const related = (all.data ?? []).filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 3);
  const shareUrl = `${siteConfig.url}/blog/${post.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seoTitle,
    description: post.metaDescription,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.publishedAt,
  };

  return (
    <>
      <Seo
        title={post.seoTitle}
        description={post.metaDescription}
        path={`/blog/${post.slug}`}
        type="article"
        jsonLd={jsonLd}
      />
      <article className="container-cxn py-10 md:py-14">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blog' }, { label: post.title }]} />
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-primary">{post.category}</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight text-ink md:text-4xl">{post.title}</h1>
        <p className="mt-4 text-sm text-muted">
          {post.author} · {post.publishedAt} · {post.readingTime}
        </p>
        {post.headings.length ? (
          <nav aria-label="Table of contents" className="mt-8 max-w-xl border border-border bg-surface-elevated p-5">
            <p className="text-sm font-semibold text-ink">On this page</p>
            <ol className="mt-3 space-y-2 text-sm">
              {post.headings.map((heading) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`} className="text-primary hover:underline">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <div
          className="prose-cxn mt-8 max-w-2xl"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />
        <div className="mt-10 flex flex-wrap gap-3 text-sm">
          <span className="font-semibold text-ink">Share:</span>
          <a
            className="text-primary hover:underline"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="text-primary hover:underline"
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noreferrer"
          >
            X
          </a>
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={() => navigator.clipboard.writeText(shareUrl)}
          >
            Copy link
          </button>
        </div>
        {related.length ? (
          <section className="mt-14">
            <h2 className="text-xl font-bold text-ink">Related posts</h2>
            <ul className="mt-4 space-y-3">
              {related.map((item) => (
                <li key={item._id}>
                  <Link to={`/blog/${item.slug}`} className="font-medium text-primary hover:underline">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </>
  );
}
