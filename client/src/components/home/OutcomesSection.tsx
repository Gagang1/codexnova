import { Section, SectionHeading } from '@/components/ui/Section';

const outcomes = [
  {
    title: 'A project you can explain',
    text: 'You will have work you can show and talk about, not only a class certificate.',
  },
  {
    title: 'Clearer interview answers',
    text: 'Practice explaining what you built, what you learned, and what you would improve.',
  },
  {
    title: 'A path to keep growing',
    text: 'Start with one skill, then move to related courses like SQL, React JS, or Power BI.',
  },
];

export function OutcomesSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="What you can take away"
        title="Skills and projects you can use"
        description="We focus on what you can do after the course. We do not invent job numbers or salary claims."
      />
      <div className="grid gap-8 md:grid-cols-3">
        {outcomes.map((item) => (
          <div key={item.title} className="hover-lift rounded-2xl border border-border bg-surface-elevated p-5">
            <h3 className="font-bold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
