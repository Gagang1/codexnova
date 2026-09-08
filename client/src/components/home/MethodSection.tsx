import { Section, SectionHeading } from '@/components/ui/Section';

const steps = [
  {
    title: 'Learn',
    text: 'Short, clear lessons. No long, confusing videos.',
  },
  {
    title: 'Build',
    text: 'Practice the same week with small tasks and projects.',
  },
  {
    title: 'Review',
    text: 'Get feedback so you understand what to improve.',
  },
  {
    title: 'Share',
    text: 'Save your work so you can talk about it in interviews.',
  },
];

export function MethodSection() {
  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="How learning works"
        title="Learn. Build. Review. Share."
        description="This simple loop helps you remember what you study and use it with confidence."
      />
      <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div key={step.title} className="bg-surface-elevated p-6 transition-colors hover:bg-primary-50/40">
            <h3 className="text-lg font-bold text-ink">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
