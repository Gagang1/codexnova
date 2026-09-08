import { Seo } from '@/components/ui/Seo';
import { Button } from '@/components/ui/Button';

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" description="This Codex Nova page could not be found." path="/404" noIndex />
      <section className="container-cxn flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <p className="font-mono text-sm font-semibold text-primary">404</p>
        <h1 className="mt-3 max-w-lg text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          This page is missing.
        </h1>
        <p className="mt-4 max-w-md text-muted">
          The link may be old or typed incorrectly. Go back to Codex Nova to continue learning.
        </p>
        <div className="mt-8">
          <Button to="/">Back to Codex Nova</Button>
        </div>
      </section>
    </>
  );
}
