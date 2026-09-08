import { Link } from 'react-router-dom';
import type { Instructor } from '@/types';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export function FacultyTeaser({ faculty }: { faculty: Instructor[] }) {
  return (
    <Section tone="white">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Faculty"
          title="Mentors who review the work."
          description="Names, photos, and credentials are placeholders until you publish real faculty profiles. Do not invent degrees."
        />
        <Button to="/faculty" variant="outline">
          Meet faculty
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {faculty.slice(0, 3).map((person) => (
          <article key={person._id}>
            <div className="mb-4 flex h-40 items-end bg-[linear-gradient(160deg,#1e3a8a,#2563eb,#06b6d4)] p-4">
              <span className="font-mono text-xs text-white/80">Profile image pending</span>
            </div>
            <h3 className="font-bold text-ink">
              <Link to={`/faculty/${person.slug}`} className="hover:text-primary">
                {person.name}
              </Link>
            </h3>
            <p className="text-sm text-primary">{person.designation}</p>
            <p className="mt-2 text-sm text-muted">{person.expertise.join(' · ')}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
