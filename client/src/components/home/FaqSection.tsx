import type { Faq } from '@/types';
import { Accordion } from '@/components/ui/Accordion';
import { Section, SectionHeading } from '@/components/ui/Section';

export function FaqSection({ items }: { items: Faq[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <Section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SectionHeading
        eyebrow="FAQ"
        title="Common questions"
        description="Simple answers about joining Codex Nova, classes, and career help."
      />
      <Accordion items={items} />
    </Section>
  );
}
