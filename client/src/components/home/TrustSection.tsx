import { BookOpen, FolderGit2, MessagesSquare, Users } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';

const items = [
  {
    icon: BookOpen,
    title: 'Clear, useful courses',
    text: 'Every course lists what you will learn, what you will build, and who it is for.',
  },
  {
    icon: FolderGit2,
    title: 'Practice first',
    text: 'You leave with small projects and examples you can explain, not only notes.',
  },
  {
    icon: MessagesSquare,
    title: 'Mentor support',
    text: 'Ask questions, get feedback, and learn with guidance — not by watching videos alone.',
  },
  {
    icon: Users,
    title: 'For every student',
    text: 'Codex Nova is open to students from different courses and backgrounds, not only engineering.',
  },
];

export function TrustSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Why students choose Codex Nova"
        title="Simple learning. Practical skills. Career focus."
        description="We keep teaching clear and honest, so you can learn at a steady pace and see your progress."
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.05}>
            <item.icon className="h-6 w-6 text-primary" aria-hidden />
            <h3 className="mt-4 text-base font-bold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
