import { ExternalLink } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { problemReferences, refNumber, sources } from "@/content/sources";

/** Superscript citation that jumps to the numbered reference. */
export function Cite({ ids }: { ids: string[] }) {
  return (
    <sup className="ml-0.5 font-mono text-[0.65em] text-cyan">
      [{ids.map((id, i) => (
        <span key={id}>
          {i > 0 && ","}
          <a href={`#ref-${id}`} className="hover:underline" aria-label={`Source ${refNumber(id)}: ${sources[id].publisher}`}>{refNumber(id)}</a>
        </span>
      ))}]
    </sup>
  );
}

const stats = [
  { value: "39.5%", label: "of water produced by WASAC was non-revenue water in 2024, down from 42.4% in 2023.", cite: ["oag2024", "newtimes2026"] },
  { value: "60.5%", label: "of the 76.6 million m³ produced in FY 2023/24 was billed (30.2 million m³).", cite: ["oag2024"] },
  { value: "~37%", label: "non-revenue water today, down from about 41% in 2020, as described to our team by WASAC.", cite: ["wasacBriefing"] },
  { value: "25%", label: "the non-revenue water target WASAC is working towards by 2030.", cite: ["newtimes2026", "wasacBriefing"] },
];

const causes = [
  ["Production-to-supply gap", "Water produced at the treatment plant that never reaches the reservoir: a direct physical loss."],
  ["Treatment losses", "Water used during treatment, for example to wash sediment out during tank cleaning."],
  ["Technical losses", "Ageing pipes, leaks and bursts, and damage from road construction and other civil works."],
  ["Commercial losses", "Meter-reading and calculation errors, illegal bypasses and unauthorised connections."],
  ["Billing losses", "The gap between the revenue expected from a network and what is actually collected."],
];

export function RwandaChallenge() {
  return (
    <Section id="rwanda" labelledBy="rwanda-title" className="border-t border-line bg-ink-850/40">
      <Container>
        <SectionHeading
          id="rwanda-title"
          eyebrow="The challenge in Rwanda"
          title="Nearly four in every ten litres never generate revenue."
          intro={
            <p>
              Rwanda has made steady progress on water losses, but non-revenue water remains far above the national
              target. Closing that gap means knowing where in the network the water is being lost.
            </p>
          }
        />

        <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.value} delay={i * 0.05} className="bg-ink-850 p-6 sm:p-7">
              <dt className="font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
                {s.value}<span className="align-top text-base font-normal">&#8288;<Cite ids={s.cite} /></span>
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-muted">{s.label}</dd>
            </Reveal>
          ))}
        </dl>
        <p className="mt-3 text-xs leading-relaxed text-subtle">
          Figures come from different sources and reporting periods, so they are shown separately rather than combined.
        </p>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h3 className="font-display text-2xl font-medium text-fg">Where the water goes</h3>
            <p className="mt-4 leading-relaxed text-muted">
              In our research meeting, WASAC&apos;s operations team described five categories of loss.<Cite ids={["wasacBriefing"]} />{" "}
              Most are invisible without measurement at more points in the network.
            </p>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {causes.map(([t, b], i) => (
              <Reveal as="li" key={t} delay={i * 0.04} className="rounded-xl border border-line bg-ink-850 p-5">
                <span className="font-mono text-xs text-cyan">{String(i + 1).padStart(2, "0")}</span>
                <h4 className="mt-2 font-display text-base font-medium text-fg">{t}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{b}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mt-12 rounded-2xl border border-cyan/30 bg-cyan/[0.05] p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-wider text-cyan">The visibility gap</p>
          <p className="mt-3 max-w-4xl font-display text-lg leading-snug text-fg sm:text-xl">
            Real-time monitoring covers volume and pressure at some locations, not across the whole network, and
            unauthorised bypasses are especially hard to trace without automated measurement.<Cite ids={["wasacBriefing"]} />{" "}
            That gap between treatment and the tap is where DropTraQ is focused.
          </p>
        </Reveal>

        <div className="mt-12 border-t border-line pt-8">
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-subtle">Sources</h3>
          <ol className="mt-4 space-y-3 text-sm text-muted">
            {problemReferences.map((id) => {
              const s = sources[id];
              return (
                <li key={id} id={`ref-${id}`} className="grid scroll-mt-28 grid-cols-[1.75rem_1fr] gap-2">
                  <span className="font-mono text-cyan">[{refNumber(id)}]</span>
                  <span>
                    {s.publisher}, <em className="not-italic text-fg">{s.label}</em>, {s.year}.
                    {s.note && <> {s.note}</>}
                    {s.url && (
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="ml-1.5 inline-flex items-center gap-1 text-cyan hover:underline">
                        View source <ExternalLink aria-hidden className="size-3" />
                      </a>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
