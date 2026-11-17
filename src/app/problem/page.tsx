import type { Metadata } from "next";
import { DistributionDiagram } from "@/components/problem/distribution-diagram";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { photos } from "@/content/site";

export const metadata: Metadata = {
  title: "The Problem",
  description:
    "Why water losses are hard to find: how water moves through distribution networks, what non-revenue water means, and why timely, granular data matters.",
  alternates: { canonical: "/problem" },
};

const hardToFind = [
  ["It happens underground", "Many leaks never surface. Water drains into soil or storm drains with no visible sign."],
  ["Averages hide locations", "A network-wide loss figure says how much is missing, not where. One number covers kilometres of pipe."],
  ["Readings arrive late", "If consumption is read monthly, a leak that started on day one has run for weeks before anyone compares totals."],
  ["Demand masks loss", "During busy daytime hours, a loss looks like normal use. It shows clearly only when demand is low, usually at night."],
  ["Apparent losses look like sales", "Meter under-registration and unauthorised connections deliver water. It just never appears in the record."],
  ["Data lives in silos", "Production figures, billing and field reports often sit in separate systems, making reconciliation slow."],
];

export default function ProblemPage() {
  return (
    <>
      <PageHero
        eyebrow="The problem"
        title={<>Water that leaves the plant does not always <span className="text-gradient">arrive.</span></>}
        intro={
          <p>
            Every distribution network loses some water between treatment and the tap. The hard part is not knowing that
            losses exist. It is knowing <em className="not-italic text-fg">where</em>, <em className="not-italic text-fg">how much</em> and{" "}
            <em className="not-italic text-fg">since when</em>.
          </p>
        }
      />

      <Section labelledBy="journey-title" className="!pt-0">
        <Container>
          <SectionHeading
            id="journey-title"
            eyebrow="How water moves"
            title="A long journey with few checkpoints."
            intro={<p>Select a stage to see what happens there. Switch between views to compare typical visibility with segment-level monitoring.</p>}
          />
          <div className="mt-12"><DistributionDiagram /></div>
          <p className="mt-3 text-xs text-subtle">Conceptual illustration of a generic network. It does not depict any specific utility.</p>
        </Container>
      </Section>

      <Section labelledBy="stages-title" className="border-t border-line bg-ink-850/40">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="stages-title"
              eyebrow="Why stages matter"
              title="Measure the boundaries, find the gap."
              intro={
                <>
                  <p>
                    If you only measure what enters the network and what customers are billed for, the difference tells
                    you how much water went missing, but not where it went.
                  </p>
                  <p className="mt-4">
                    Measuring at the boundaries between stages, and between sections within a stage, turns one large
                    unknown into many small, checkable balances. Each one can be investigated on its own.
                  </p>
                </>
              }
            />
          </div>
          <Reveal className="lg:col-span-7">
            <Photo photo={photos.pipeManifold} sizes="(min-width:1024px) 680px, 100vw" className="aspect-[4/3]" position="center 60%"
              caption="Pumping-hall pipework · photographed by our team during a learning visit" />
          </Reveal>
        </Container>
      </Section>

      {/* NRW */}
      <Section labelledBy="nrw-title" className="border-t border-line">
        <Container>
          <SectionHeading
            id="nrw-title"
            eyebrow="Non-revenue water"
            title="What “non-revenue water” actually means."
            intro={
              <p>
                Non-revenue water (NRW) is the water that enters a distribution system but does not generate revenue.
                The International Water Association&apos;s standard water balance breaks it down into three parts.
              </p>
            }
          />

          <Reveal className="mt-12 overflow-x-auto">
            <div className="grid min-w-[680px] grid-cols-[1fr_1fr_1.25fr_0.9fr] gap-1.5 text-sm">
              <div className="row-span-4 flex flex-col justify-center rounded-xl border border-line-strong bg-ink-800 p-4">
                <p className="font-display text-base text-fg">System input volume</p>
                <p className="mt-1 text-xs text-muted">All water entering the network</p>
              </div>
              <div className="row-span-2 flex flex-col justify-center rounded-xl border border-line bg-ink-850 p-4">
                <p className="font-display text-fg">Authorised consumption</p>
              </div>
              <div className="rounded-xl border border-line bg-ink-850 p-4 text-fg/90">Billed authorised consumption</div>
              <div className="flex items-center rounded-xl border border-ok/40 bg-ok/10 p-4 font-display text-ok">Revenue water</div>

              <div className="rounded-xl border border-line bg-ink-850 p-4 text-fg/90">Unbilled authorised consumption <span className="block text-xs text-subtle">e.g. firefighting, mains flushing</span></div>
              <div className="row-span-3 flex flex-col justify-center rounded-xl border border-amber/40 bg-amber/10 p-4">
                <p className="font-display text-amber">Non-revenue water</p>
                <p className="mt-1 text-xs text-muted">The sum of these three</p>
              </div>

              <div className="row-span-2 flex flex-col justify-center rounded-xl border border-line bg-ink-850 p-4">
                <p className="font-display text-fg">Water losses</p>
              </div>
              <div className="rounded-xl border border-line bg-ink-850 p-4 text-fg/90">Apparent (commercial) losses <span className="block text-xs text-subtle">meter inaccuracy, unauthorised use, data errors</span></div>
              <div className="rounded-xl border border-line bg-ink-850 p-4 text-fg/90">Real (physical) losses <span className="block text-xs text-subtle">leaks and bursts on mains, storage overflows, service-pipe leaks</span></div>
            </div>
          </Reveal>
          <p className="mt-4 text-xs text-subtle">Simplified from the IWA standard water balance (International Water Association). Terminology only, no figures implied.</p>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {[
              ["Real losses cost twice", "Physically lost water has already been abstracted, treated and pumped. The energy and chemicals are lost with it."],
              ["Apparent losses distort records", "Water is consumed but never recorded, so demand planning and billing both rest on incomplete data."],
              ["Both reduce service", "Water lost on the way is water that does not reach households, kiosks and businesses at the pressure and hours they need."],
            ].map(([t, b], i) => (
              <Reveal key={t} delay={i * 0.05}>
                <div className="h-px w-10 bg-cyan" />
                <h3 className="mt-5 font-display text-lg text-fg">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why hard */}
      <Section labelledBy="hard-title" className="border-t border-line bg-ink-950">
        <Container>
          <SectionHeading id="hard-title" eyebrow="Why losses stay hidden" title="Six reasons losses are hard to identify." />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {hardToFind.map(([t, b], i) => (
              <Reveal as="li" key={t} delay={(i % 3) * 0.05} className="bg-ink-900 p-6 sm:p-8">
                <span className="font-mono text-xs text-cyan">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-lg text-fg">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Real-time */}
      <Section labelledBy="time-title" className="border-t border-line">
        <Container className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading
              id="time-title"
              eyebrow="Why timing matters"
              title="The cost of a leak grows with every hour it is not seen."
              intro={<p>Loss volume is roughly flow rate × time undetected. Measurement cannot change the flow rate of a leak, but timely data can shorten the time.</p>}
            />
          </div>
          <Reveal className="lg:col-span-7">
            <figure className="rounded-2xl border border-line bg-ink-850/70 p-6 sm:p-8">
              <figcaption className="font-mono text-[11px] uppercase tracking-wider text-subtle">Detection window · conceptual</figcaption>
              <div className="mt-8 space-y-7">
                {[
                  ["Periodic reconciliation", "Leak found at the next billing comparison", "w-full", "bg-amber/70"],
                  ["Manual patrols", "Found when visible or reported", "w-[58%]", "bg-amber/50"],
                  ["Continuous segment data", "Flagged when the balance shifts", "w-[14%]", "bg-cyan"],
                ].map(([label, note, w, c]) => (
                  <div key={label}>
                    <div className="flex items-baseline justify-between gap-4 text-sm">
                      <span className="text-fg">{label}</span>
                      <span className="text-right text-xs text-subtle">{note}</span>
                    </div>
                    <div className="mt-2 h-2.5 rounded-full bg-ink-800">
                      <div className={`h-full rounded-full ${w} ${c}`} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-between font-mono text-[10px] uppercase tracking-wider text-subtle">
                <span>Leak starts</span><span>Time undetected →</span>
              </div>
              <p className="mt-6 text-xs text-subtle">Bar lengths are illustrative. They show the idea, not measured durations.</p>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* Decisions */}
      <Section labelledBy="decisions-title" className="border-t border-line bg-ink-850/40">
        <Container>
          <SectionHeading
            id="decisions-title"
            eyebrow="From data to decisions"
            title="What better data makes possible."
            intro={<p>Data does not fix pipes. People do. Good data helps them decide where to go first and what to fix.</p>}
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Targeted inspection", "Send crews to the section where the balance shifted, not the whole district."],
              ["Prioritised repairs", "Rank sections by volume lost so limited budgets go furthest."],
              ["Pressure & operations", "See how operational changes affect flow and losses across the zone."],
              ["Accountability", "A shared, timestamped record of where water went, for operators, regulators and the public."],
            ].map(([t, b], i) => (
              <Reveal as="li" key={t} delay={i * 0.05} className="rounded-2xl border border-line bg-ink-900 p-6">
                <h3 className="font-display text-lg text-fg">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b}</p>
              </Reveal>
            ))}
          </ul>
          <div className="mt-14 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/technology" arrow>How DropTraQ approaches it</ButtonLink>
            <ButtonLink href="/contact?type=enterprise" variant="secondary">Talk to us as an operator</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
