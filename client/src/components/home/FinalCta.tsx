import { Button } from '@/components/ui/Button';

export function FinalCta() {
  return (
    <section className="bg-ink">
      <div className="container-cxn py-16 md:py-24">
        <h2 className="max-w-xl text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Ready to start learning?
        </h2>
        <p className="mt-4 max-w-lg text-white/70">
          Browse courses, talk to a mentor, or enroll. We will share batch details and fees with you.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button to="/enroll" size="lg">
            Enroll Now
          </Button>
          <Button to="/contact" variant="outline" size="lg" className="border-white/20 bg-transparent text-white hover:border-white/40 hover:text-white">
            Talk to a Mentor
          </Button>
        </div>
      </div>
    </section>
  );
}
