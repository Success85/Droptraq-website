import { BarChart3, Cpu, Database, MonitorDot, RadioTower, Waves } from "lucide-react";
import { ApproachFlow } from "./approach-flow";
import { DashboardPreview } from "./dashboard-preview";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusBadge } from "@/components/ui/status-badge";
import { TeamProfiles } from "@/components/about/team-profiles";
import { Milestones } from "@/components/ui/milestones";
import { photos } from "@/content/site";
import { disciplines } from "@/content/technology";

/* ───────── Approach ───────── */
export function ApproachSection() {
  return (
    <Section labelledBy="approach-title" className="border-t border-line">
      <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-40 [mask-image:linear-gradient(180deg,transparent,#000_30%,#000_70%,transparent)]" />
      <Container>
        <SectionHeading
          id="approach-title"
          eyebrow="Our approach"
          title="From Physical Flow to Actionable Intelligence."
          intro={<p>Five stages carry a measurement from the pipe to the person who needs to act on it. Select a stage to see what happens there.</p>}
        />
        <div className="mt-14">
          <ApproachFlow />
        </div>
      </Container>
    </Section>
  );
}

/* ───────── Technology preview ───────── */
const disciplineIcons = { iot: Cpu, hardware: Waves, protocols: RadioTower, backend: Database, analytics: BarChart3, visualization: MonitorDot } as const;

export function TechPreview() {
  return (
    <Section labelledBy="tech-title" className="border-t border-line bg-ink-850/40">
      <Container className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            id="tech-title"
            eyebrow="Technology"
            title="Engineering the Intelligence Layer."
            intro={<p>DropTraQ sits where hardware, firmware, networking and software meet. These are the disciplines we work across today.</p>}
          />
          <div className="mt-10 grid grid-cols-2 gap-3">
            <Photo photo={photos.prototypeWiring} sizes="(min-width:1024px) 200px, 50vw" className="aspect-[3/4]" />
            <Photo photo={photos.conceptSketch} sizes="(min-width:1024px) 200px, 50vw" className="aspect-[3/4]" position="center 30%" />
          </div>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-subtle">Bench prototype · early network sketch</p>
          <ButtonLink href="/technology" arrow className="mt-8">See the architecture</ButtonLink>
        </div>

        <ul className="grid gap-px self-start overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:col-span-8">
          {disciplines.map((d, i) => {
            const Icon = disciplineIcons[d.id];
            return (
              <Reveal as="li" key={d.id} delay={(i % 2) * 0.05} className="group bg-ink-900 p-6 transition-colors duration-300 hover:bg-ink-850 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-line-strong text-cyan transition-colors group-hover:border-cyan/50">
                    <Icon aria-hidden className="size-5" strokeWidth={1.5} />
                  </span>
                  <span className="font-mono text-[11px] text-subtle">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 font-display text-lg font-medium text-fg">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {d.tags.map((t) => (
                    <li key={t} className="rounded-md border border-line px-2 py-0.5 font-mono text-[10.5px] text-muted">{t}</li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

/* ───────── Product preview ───────── */
export function ProductPreview() {
  return (
    <Section labelledBy="product-title" className="border-t border-line overflow-hidden">
      <div aria-hidden className="absolute left-1/2 top-40 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(36,200,216,0.10),transparent_65%)]" />
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="product-title"
            eyebrow="The platform"
            title="One view of the network."
            intro={
              <p>
                The DropTraQ monitoring platform brings flow, device health and segment balances together, so operators
                can see what changed and where. Our working prototype already streams live flow over MQTT into a
                dashboard. The fuller interface below is a design preview of where it is heading.
              </p>
            }
          />
          <div className="flex shrink-0 flex-wrap gap-2">
            <StatusBadge status="prototyped" />
            <StatusBadge status="development" />
          </div>
        </div>
        <Reveal className="mt-12" y={30}>
          <DashboardPreview />
        </Reveal>
        <p className="mt-4 text-xs leading-relaxed text-subtle">
          All values shown are simulated for illustration. This is not a deployed commercial system and does not show
          data from any utility.
        </p>
      </Container>
    </Section>
  );
}

/* ───────── Traction ───────── */
export function TractionSection() {
  return (
    <Section labelledBy="traction-title" className="border-t border-line">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="traction-title"
            eyebrow="Progress so far"
            title="Early, and moving."
            intro={<p>What we have done so far: field research, a working data path, prize funding and a growing team.</p>}
          />
          <ButtonLink href="/insights" variant="secondary" arrow className="shrink-0 self-start lg:self-auto">News &amp; milestones</ButtonLink>
        </div>
        <Milestones className="mt-12" />
      </Container>
    </Section>
  );
}

/* ───────── Team ───────── */
export function TeamSection() {
  return (
    <Section id="team" labelledBy="team-title" className="border-t border-line bg-ink-950">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="team-title"
            className="lg:col-span-7"
            eyebrow="The team"
            title="People Building What Comes Next."
            intro={
              <p>
                DropTraQ is built by a small, hands-on team of engineers and builders in Kigali. We sketch on paper,
                wire prototypes on the bench, write the firmware and go to the field to learn how water infrastructure
                really works.
              </p>
            }
          />
          <div className="lg:col-span-5 lg:pb-2">
            <ButtonLink href="/contact?type=talent" arrow>Build With Us</ButtonLink>
          </div>
        </div>

        <TeamProfiles className="mt-12" />

        <div className="mt-4 grid gap-4 md:grid-cols-12 md:grid-rows-2">
          <Reveal className="md:col-span-7 md:row-span-2">
            <Photo photo={photos.teamWorkingSession} sizes="(min-width:768px) 700px, 100vw" className="aspect-[4/3] h-full md:aspect-auto"
              caption="Working session · firmware & dashboard" position="30% center" />
          </Reveal>
          <Reveal delay={0.06} className="md:col-span-5">
            <Photo photo={photos.teamInnovationHub} sizes="(min-width:768px) 500px, 100vw" className="aspect-[16/10] md:aspect-auto md:h-full md:min-h-[260px]"
              caption="The team in Kigali" position="center 35%" />
          </Reveal>
          <Reveal delay={0.12} className="md:col-span-5">
            <Photo photo={photos.teamDesignReview} sizes="(min-width:768px) 500px, 100vw" className="aspect-[16/10] md:aspect-auto md:h-full md:min-h-[260px]"
              caption="Design review" position="center 40%" />
          </Reveal>
        </div>

      </Container>
    </Section>
  );
}

/* ───────── Vision ───────── */
function VisionField() {
  // A widening lattice of zones, abstracting "one zone → many".
  const cols = 14, rows = 7;
  const pts: { x: number; y: number; on: boolean }[] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const x = 40 + c * 70 + (r % 2) * 35;
      const y = 40 + r * 62;
      const d = Math.hypot(c - 3, r - 3);
      pts.push({ x, y, on: d < 2.4 });
    }
  return (
    <svg viewBox="0 0 1020 460" className="h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice">
      {pts.map((p, i) => {
        const n = pts[i + 1];
        return n && n.y === p.y ? (
          <line key={`l${i}`} x1={p.x} y1={p.y} x2={n.x} y2={n.y} stroke={p.on && n.on ? "#12a7ba" : "#e2e9f0"} strokeOpacity={p.on && n.on ? 0.7 : 0.8} strokeWidth={1} />
        ) : null;
      })}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.on ? 4 : 2.2} fill={p.on ? "#12a7ba" : "#b8c8d5"} />
      ))}
      <circle cx={40 + 3 * 70 + 35} cy={40 + 3 * 62} r={120} fill="none" stroke="#12a7ba" strokeOpacity={0.25} strokeDasharray="3 6" />
    </svg>
  );
}

const visionPillars = [
  ["Infrastructure visibility", "Measurement at the points that matter, not only at the source and the customer."],
  ["Water accountability", "A clear record of where water went, so losses can be explained and reduced."],
  ["Data-informed decisions", "Maintenance and investment guided by evidence rather than estimates."],
  ["Efficient networks", "Faster detection means less water, energy and treatment cost lost along the way."],
  ["Scalable intelligence", "Designed from the start to grow from one zone to many networks."],
];

export function VisionSection() {
  return (
    <Section labelledBy="vision-title" className="overflow-hidden border-t border-line">
      <div aria-hidden className="absolute inset-0 -z-10 opacity-70 [mask-image:linear-gradient(180deg,#000,transparent_85%)]">
        <VisionField />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/30 via-ink-900/75 to-ink-900" />
      <Container>
        <div className="max-w-4xl pt-10 sm:pt-24">
          <p className="eyebrow">Our vision</p>
          <h2 id="vision-title" className="mt-6 font-display text-4xl font-semibold leading-[1.04] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
            Building a More Intelligent <span className="text-gradient">Water Future.</span>
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            We start with one zone and one question: where did the water go? Our long-term ambition is to help
            infrastructure operators across Rwanda, Africa and beyond answer it continuously, for every network they run.
          </p>
        </div>
        <ol className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {visionPillars.map(([t, b], i) => (
            <Reveal as="li" key={t} delay={i * 0.05} className="bg-ink-900/90 p-6 backdrop-blur">
              <span className="font-mono text-xs text-cyan">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-base font-medium text-fg">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* ───────── Closing CTA ───────── */
export function ClosingCta() {
  return (
    <Section labelledBy="cta-title" className="border-t border-line">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-line-strong bg-ink-850 px-6 py-16 sm:px-14 sm:py-20">
          <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
          <div aria-hidden className="absolute -right-24 -top-24 size-96 rounded-full bg-[radial-gradient(circle,rgba(36,200,216,0.2),transparent_65%)]" />
          <div className="relative max-w-3xl">
            <h2 id="cta-title" className="font-display text-3xl font-semibold leading-[1.08] sm:text-5xl">
              Let&apos;s Build a More Intelligent Infrastructure Future.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              We are interested in connecting with engineers, infrastructure operators, technology partners, and people
              who believe in solving important real-world problems.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact?type=partnership" arrow>Partner With Us</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">Get in Touch</ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
