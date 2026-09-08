const tones: Record<string, string> = {
  Programming: 'from-[#1e3a8a] to-[#2563eb]',
  'Data Analytics': 'from-[#0e7490] to-[#06b6d4]',
  'Data Science': 'from-[#5b21b6] to-[#7c3aed]',
  'AI/ML': 'from-[#0f172a] to-[#2563eb]',
  'Web Development': 'from-[#1d4ed8] to-[#06b6d4]',
  Database: 'from-[#0f766e] to-[#2563eb]',
  Cloud: 'from-[#1e40af] to-[#38bdf8]',
  Cybersecurity: 'from-[#111827] to-[#334155]',
  'Microsoft Tools': 'from-[#075985] to-[#2563eb]',
  'Career/Placement': 'from-[#4c1d95] to-[#2563eb]',
};

export function CategoryMark({ name }: { name: string }) {
  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-xs font-bold text-white ${tones[name] ?? 'from-ink to-primary'}`}
      aria-hidden
    >
      {name
        .split(/[\s/]+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()}
    </div>
  );
}
