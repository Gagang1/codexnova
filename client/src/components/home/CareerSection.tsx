import { Section, SectionHeading } from '@/components/ui/Section';

export function CareerSection() {
  return (
    <Section tone="white">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <SectionHeading
          eyebrow="Career and placement preparation"
          title="Get ready for internships and jobs"
          description="We help you present your skills clearly: simple resumes, project stories, and interview practice. Codex Nova does not promise jobs or salary packages."
        />
        <ul className="space-y-3 text-sm leading-relaxed text-muted">
          <li>— How to write about your projects</li>
          <li>— Practice for technical and HR interviews</li>
          <li>— Help with internship applications</li>
          <li>— Honest advice about careers and next steps</li>
        </ul>
      </div>
    </Section>
  );
}
