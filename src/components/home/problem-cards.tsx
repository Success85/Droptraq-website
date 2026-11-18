import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";

/* Custom line icons, drawn on a 32px grid to match the technical style. */
const icons = {
  visibility: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path d="M3 16c3.5-6 8-9 13-9s9.5 3 13 9c-3.5 6-8 9-13 9s-9.5-3-13-9Z" />
      <circle cx="16" cy="16" r="4" />
      <path d="M5 27 27 5" strokeDasharray="2 2.5" />
    </svg>
  ),
  losses: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path d="M2 13h11m6 0h11M2 19h11m6 0h11" />
      <path d="M13 13c1.5 2 1.5 4 0 6M19 13c-1.5 2-1.5 4 0 6" />
      <path d="M16 21v3m0 3v.5" strokeLinecap="round" />
    </svg>
  ),
  delayed: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <circle cx="16" cy="17" r="11" />
      <path d="M16 10v7l4.5 3M12 3h8" />
    </svg>
  ),
  fragmented: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <rect x="3" y="4" width="10" height="8" rx="1.5" />
      <rect x="19" y="4" width="10" height="8" rx="1.5" />
      <rect x="3" y="20" width="10" height="8" rx="1.5" />
      <rect x="19" y="20" width="10" height="8" rx="1.5" strokeDasharray="2 2" />
      <path d="M13 8h2m2 0h2M8 12v2m0 2v2" />
    </svg>
  ),
};

/* Small technical visuals revealed more clearly on hover. */
function VisualVisibility() {
  return (
    <svg viewBox="0 0 240 70" className="h-full w-full" aria-hidden>
      <path d="M0 35H240" stroke="#d6e2eb" strokeWidth="8" />
      <path d="M0 35H240" stroke="#2589d8" strokeWidth="2" strokeDasharray="6 6" className="animate-dash" />
      <rect x="40" y="10" width="160" height="50" rx="4" fill="#ffffff" stroke="#b8c8d5" strokeDasharray="3 3" />
      <text x="120" y="39" textAnchor="middle" className="fill-subtle font-mono text-[10px] tracking-widest">NO DATA</text>
      <circle cx="20" cy="35" r="5" fill="#12a7ba" />
      <circle cx="220" cy="35" r="5" fill="#12a7ba" />
    </svg>
  );
}
function VisualLosses() {
  return (
    <svg viewBox="0 0 240 70" className="h-full w-full" aria-hidden>
      <path d="M0 30H240" stroke="#d6e2eb" strokeWidth="8" />
      <path d="M0 30H120" stroke="#2589d8" strokeWidth="2.4" />
      <path d="M120 30H240" stroke="#2589d8" strokeOpacity="0.45" strokeWidth="1.4" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={120 + i * 3 - 3} cy={44 + i * 7} r={2} fill="#c97c0e" opacity={1 - i * 0.25} />
      ))}
      <text x="8" y="58" className="fill-subtle font-mono text-[9px]">SENT 100</text>
      <text x="168" y="58" className="fill-subtle font-mono text-[9px]">RECV 84</text>
    </svg>
  );
}
function VisualDelayed() {
  return (
    <svg viewBox="0 0 240 70" className="h-full w-full" aria-hidden>
      <path d="M10 50 C40 50 50 48 70 46 S100 20 120 22 S170 24 230 24" fill="none" stroke="#12a7ba" strokeWidth="1.6" />
      <path d="M90 8V62" stroke="#c97c0e" strokeDasharray="2 3" />
      <path d="M200 8V62" stroke="#8396a5" strokeDasharray="2 3" />
      <text x="94" y="14" className="fill-amber font-mono text-[9px]">EVENT</text>
      <text x="168" y="14" className="fill-muted font-mono text-[9px]">FOUND</text>
      <path d="M92 56H198" stroke="#8396a5" strokeWidth="1" markerEnd="url(#arr)" />
      <defs><marker id="arr" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L6 3L0 6" fill="#8396a5" /></marker></defs>
    </svg>
  );
}
function VisualFragmented() {
  return (
    <svg viewBox="0 0 240 70" className="h-full w-full" aria-hidden>
      {["LOGBOOK", "SCADA", "BILLING", "FIELD"].map((t, i) => (
        <g key={t} transform={`translate(${8 + i * 58} 18)`}>
          <rect width="50" height="34" rx="4" fill="#f3f7fa" stroke="#b8c8d5" />
          <text x="25" y="21" textAnchor="middle" className="fill-muted font-mono text-[8px]">{t}</text>
        </g>
      ))}
      <path d="M58 35h8M116 35h8M174 35h8" stroke="#cf3e2e" strokeDasharray="2 2" />
    </svg>
  );
}

const problems = [
  {
    key: "visibility",
    title: "Limited Visibility",
    body: "Many points in a distribution network are not measured at all, or are measured too rarely to show what is happening between them.",
    visual: <VisualVisibility />,
  },
  {
    key: "losses",
    title: "Undetected Losses",
    body: "Leaks, bursts and unauthorised connections can run for a long time when nobody compares the water sent with the water received.",
    visual: <VisualLosses />,
  },
  {
    key: "delayed",
    title: "Delayed Detection",
    body: "When readings arrive days or weeks later, a problem is found long after it started, and more water has already been lost.",
    visual: <VisualDelayed />,
  },
  {
    key: "fragmented",
    title: "Fragmented Data",
    body: "Measurements are spread across logbooks, separate systems and field reports, which makes a single view of the network hard to build.",
    visual: <VisualFragmented />,
  },
] as const;

export function ProblemCards() {
  return (
    <Section labelledBy="problem-title" className="border-t border-line bg-ink-850/40">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="problem-title"
            eyebrow="The problem"
            title="Water Loss Is Also a Visibility Problem."
            intro={
              <p>
                In Rwanda, non-revenue water stood at 39.5% in 2024, against a national target of 25%.{" "}
                <a href="/problem#rwanda" className="text-cyan underline-offset-2 hover:underline">See the sources</a>.
                It is not only about meters. It is also about the missing link between what happens in the pipes and
                what operators can see, and how quickly they can see it.
              </p>
            }
          />
          <ButtonLink href="/problem" variant="secondary" arrow className="shrink-0">Understand the challenge</ButtonLink>
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-2">
          {problems.map((p, i) => (
            <Reveal as="li" key={p.key} delay={i * 0.06}>
              <article
                tabIndex={0}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-900 p-6 outline-none transition-[border-color,transform,background-color] duration-300 hover:-translate-y-0.5 hover:border-cyan/40 hover:bg-ink-850 focus-visible:border-cyan/60 sm:p-8"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl border border-line-strong bg-ink-800 text-cyan transition-colors duration-300 group-hover:border-cyan/50 [&>svg]:size-7">
                    {icons[p.key]}
                  </span>
                  <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-display text-xl font-medium text-fg sm:text-2xl">{p.title}</h3>
                <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted">{p.body}</p>
                <div className="mt-8 h-[70px] opacity-55 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {p.visual}
                </div>
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-cyan to-water transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-subtle">
          Visuals are conceptual illustrations, not measured data.
        </p>
      </Container>
    </Section>
  );
}
