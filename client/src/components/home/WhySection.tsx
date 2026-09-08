import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';

const reasons = [
  {
    title: 'For students from every background',
    text: 'Whether you study science, commerce, arts, diploma, or engineering, you can start here.',
  },
  {
    title: 'Beginner-friendly lessons',
    text: 'We explain ideas in simple English and build skills one step at a time, so every learner feels supported from day one.',
  },
  {
    title: 'Skills used in real work',
    text: 'Learn tools like Python, SQL, JavaScript, React JS, Excel, and Power BI through practice.',
  },
  {
    title: 'Career-ready habits',
    text: 'Projects, feedback, and interview practice help you feel more confident about next steps.',
  },
];

export function WhySection() {
  return (
    <Section id="about-codex-nova">
      <SectionHeading
        eyebrow="About Codex Nova"
        title="Helping students learn useful skills and prepare for their careers"
        description="Codex Nova helps you learn practical technology skills, build useful knowledge, and get ready for internships, jobs, and further study."
      />
      <ol className="grid auto-rows-fr gap-6 md:grid-cols-2">
        {reasons.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.06} className="h-full">
            <li className="hover-lift flex h-full min-h-[9.5rem] gap-4 rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft">
              <span className="font-mono text-sm font-semibold text-primary">0{index + 1}</span>
              <div className="flex flex-1 flex-col">
                <h3 className="font-bold text-ink">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
