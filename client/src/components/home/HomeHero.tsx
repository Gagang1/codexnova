import { motion, useReducedMotion } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { BrandMark } from '@/components/layout/BrandMark';
import { Button } from '@/components/ui/Button';
import { HeroVisual } from './HeroVisual';

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(165deg,#e8f0fb_0%,#f3f7fc_42%,#f8fafc_100%)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgb(15_23_42/0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgb(15_23_42/0.045)_1px,transparent_1px)] [background-size:36px_36px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="container-cxn relative grid items-center gap-10 py-16 md:gap-12 md:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:py-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="flex flex-wrap items-center gap-x-2 text-sm font-semibold tracking-tight">
            <BrandMark size="sm" />
            <span className="font-medium text-muted">· {siteConfig.tagline}</span>
          </p>
          <h1 className="mt-5 max-w-xl text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.85rem] lg:leading-[1.12]">
            Learn skills. Build projects. Prepare for your career.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            CodeXNova helps students from different educational backgrounds learn practical technology
            skills and get ready for real opportunities.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/courses" size="lg">
              Explore Courses
            </Button>
            <Button to="/contact" variant="outline" size="lg">
              Talk to a Mentor
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
