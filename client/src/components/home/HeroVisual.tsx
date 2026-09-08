export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none" aria-hidden>
      <div className="absolute -inset-8 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_srgb,var(--color-primary)_22%,transparent),transparent_42%),radial-gradient(circle_at_90%_80%,color-mix(in_srgb,var(--color-accent)_16%,transparent),transparent_46%)]" />
      <div className="relative overflow-hidden border-y border-white/10 bg-[#0b1220] text-left shadow-lift md:rounded-2xl md:border">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[11px] text-white/45">codexnova / studio · main</span>
        </div>
        <div className="grid md:grid-cols-[1.15fr_0.85fr]">
          <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-6 text-[#c6d4ee] sm:text-xs sm:leading-7">
            <span className="text-[#7dd3fc]">def</span>
            {' '}
            build_future(student):
            {'\n    '}
            skills = [
            <span className="text-[#fcd34d]">"python"</span>
            ,{' '}
            <span className="text-[#fcd34d]">"sql"</span>
            ,{' '}
            <span className="text-[#fcd34d]">"react"</span>
            ]
            {'\n    '}
            projects = studio.review(student.work)
            {'\n    '}
            <span className="text-[#7dd3fc]">return</span>
            {' '}
            CareerPath(skills, projects, mentors=True)
          </pre>
          <div className="border-t border-white/10 p-4 md:border-l md:border-t-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-300">live lab</p>
            <ul className="mt-3 space-y-2 text-xs text-white/75">
              <li className="flex justify-between gap-3">
                <span>Data pipeline</span>
                <span className="font-mono text-success">passing</span>
              </li>
              <li className="flex justify-between gap-3">
                <span>API schema</span>
                <span className="font-mono text-accent-300">v1.4</span>
              </li>
              <li className="flex justify-between gap-3">
                <span>Model eval</span>
                <span className="font-mono text-primary-300">baseline+</span>
              </li>
              <li className="flex justify-between gap-3">
                <span>Deploy</span>
                <span className="font-mono text-white/50">ready</span>
              </li>
            </ul>
            <div className="mt-4 grid grid-cols-6 gap-1">
              {Array.from({ length: 18 }).map((_, index) => (
                <span
                  key={index}
                  className="h-6 rounded-sm"
                  style={{
                    background: `hsl(${210 + (index % 5) * 12} 80% ${42 + (index % 4) * 8}%)`,
                    opacity: 0.35 + (index % 5) * 0.12,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
