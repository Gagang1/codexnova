import { Seo } from '@/components/ui/Seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { aboutContent } from '@/content/about';
import { FinalCta } from '@/components/home/FinalCta';
import { Reveal } from '@/components/ui/Reveal';

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Codex Nova"
        description="Codex Nova helps students from different educational backgrounds learn practical technology skills and prepare for their careers."
        path="/about"
      />
      <div className="bg-[linear-gradient(180deg,#eef3fb,var(--color-surface))]">
        <div className="container-cxn py-12 md:py-16">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
          <h1 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
            About Codex Nova
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{aboutContent.story}</p>
        </div>
      </div>

      <div className="container-cxn grid gap-10 py-14 md:grid-cols-2">
        <section>
          <h2 className="text-2xl font-bold text-ink">Mission</h2>
          <p className="mt-3 text-muted">{aboutContent.mission}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-ink">Vision</h2>
          <p className="mt-3 text-muted">{aboutContent.vision}</p>
        </section>
      </div>

      <section className="bg-surface-elevated py-14">
        <div className="container-cxn">
          <h2 className="text-2xl font-bold text-ink">What we care about</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {aboutContent.values.map((value) => (
              <Reveal key={value.title}>
                <h3 className="font-bold text-ink">{value.title}</h3>
                <p className="mt-2 text-sm text-muted">{value.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-cxn py-14">
        <h2 className="text-2xl font-bold text-ink">How we teach</h2>
        <p className="mt-3 max-w-2xl text-muted">{aboutContent.philosophy}</p>
        <h2 className="mt-10 text-2xl font-bold text-ink">A simple learning approach</h2>
        <ul className="mt-4 space-y-2 text-muted">
          {aboutContent.approach.map((item) => (
            <li key={item}>— {item}</li>
          ))}
        </ul>
      </section>
      <FinalCta />
    </>
  );
}
