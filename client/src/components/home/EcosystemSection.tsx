import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';

type StackItem = {
  name: string;
  icon: string;
  chip?: string;
};

const stack: StackItem[] = [
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'SQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
  { name: 'C', icon: 'https://cdn.simpleicons.org/c/A8B9CC' },
  { name: 'C++', icon: 'https://cdn.simpleicons.org/cplusplus/00599C' },
  { name: 'Java', icon: 'https://cdn.simpleicons.org/openjdk/437291' },
  { name: 'HTML', icon: 'https://cdn.simpleicons.org/html5/E34F26' },
  { name: 'CSS', icon: 'https://cdn.simpleicons.org/css/663399' },
  { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'React JS', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  // Simple Icons CDN 404s for Microsoft brands — Iconify hosts them reliably
  {
    name: 'Power BI',
    icon: 'https://api.iconify.design/simple-icons:powerbi.svg?color=%23F2C811',
    chip: 'bg-slate-800 ring-slate-700',
  },
  {
    name: 'Excel',
    icon: 'https://api.iconify.design/simple-icons:microsoftexcel.svg?color=%23217346',
    chip: 'bg-emerald-50 ring-emerald-100',
  },
  {
    name: 'Word',
    icon: 'https://api.iconify.design/simple-icons:microsoftword.svg?color=%232B579A',
    chip: 'bg-blue-50 ring-blue-100',
  },
  {
    name: 'PowerPoint',
    icon: 'https://api.iconify.design/simple-icons:microsoftpowerpoint.svg?color=%23B7472A',
    chip: 'bg-orange-50 ring-orange-100',
  },
  { name: 'NumPy', icon: 'https://cdn.simpleicons.org/numpy/013243' },
  { name: 'Pandas', icon: 'https://cdn.simpleicons.org/pandas/150458' },
  { name: 'Matplotlib', icon: 'https://cdn.simpleicons.org/plotly/3F4F75' },
  { name: 'Machine Learning', icon: 'https://cdn.simpleicons.org/scikitlearn/F7931E' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E' },
  { name: 'Express.js', icon: 'https://cdn.simpleicons.org/express/000000' },
  { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
  { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
];

export function EcosystemSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Technology ecosystem"
        title="Tools you will actually use"
        description="These are technologies taught across Codex Nova courses. They are learning tools, not company partners."
      />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {stack.map((item, index) => (
          <Reveal key={item.name} delay={index * 0.03}>
            <li className="hover-lift group flex min-h-28 flex-col items-center justify-center gap-2.5 rounded-2xl border border-border bg-surface-elevated px-3 py-5 text-center shadow-soft">
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110 ${
                  item.chip ?? 'bg-primary-50/80 ring-border/60'
                }`}
              >
                <img
                  src={item.icon}
                  alt=""
                  className="h-8 w-8 object-contain"
                  width={32}
                  height={32}
                  loading="lazy"
                />
              </span>
              <span className="text-sm font-semibold text-ink">{item.name}</span>
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
