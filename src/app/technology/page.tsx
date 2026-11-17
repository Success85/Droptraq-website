import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { ArchitectureDiagram } from "@/components/technology/architecture-diagram";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusBadge, StatusLegend } from "@/components/ui/status-badge";
import { photos } from "@/content/site";
import { architecture, roadmap, type Status } from "@/content/technology";

export const metadata: Metadata = {
  title: "Our Technology",
  description:
    "How DropTraQ turns water flow into operational insight: flow sensors, ESP32 embedded controllers, MQTT telemetry, data processing and a monitoring dashboard. Clearly marked as prototyped, in development or planned.",
  alternates: { canonical: "/technology" },
};

function Layer({
  index, title, status, children, aside, reverse,
}: { index: string; title: string; status: Status; children: React.ReactNode; aside: React.ReactNode; reverse?: boolean }) {
  return (
    <div className="grid items-center gap-10 border-t border-line py-16 first:border-t-0 lg:grid-cols-12 lg:gap-16 lg:py-20">
      <Reveal className={reverse ? "min-w-0 lg:order-2 lg:col-span-6" : "min-w-0 lg:col-span-6"}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm text-cyan">{index}</span>
          <StatusBadge status={status} />
        </div>
        <h3 className="mt-5 font-display text-2xl font-medium text-fg sm:text-3xl">{title}</h3>
        <div className="mt-5 space-y-4 leading-relaxed text-muted">{children}</div>
      </Reveal>
      <Reveal delay={0.08} className={reverse ? "min-w-0 lg:order-1 lg:col-span-6" : "min-w-0 lg:col-span-6"}>{aside}</Reveal>
    </div>
  );
}

function Code({ title, children, note }: { title: string; children: string; note?: string }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-ink-950">
      <figcaption className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-subtle">
        <span>{title}</span>{note && <span className="text-amber">{note}</span>}
      </figcaption>
      <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed text-cyan-soft/90">{children}</pre>
    </figure>
  );
}

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Our technology"
        title={<>From the pipe to the decision, <span className="text-gradient">one layer at a time.</span></>}
        intro={
          <p>
            DropTraQ is building an end-to-end monitoring system for water distribution: sensors on the pipe, embedded
            devices at the edge, reliable telemetry, a processing and storage layer, and an interface operators can act
            on. Every capability below is labelled with where it really stands today.
          </p>
        }
      >
        <ol aria-label="System data path" className="flex flex-wrap items-center gap-x-1 gap-y-2 font-mono text-[11.5px] uppercase tracking-wider">
          {architecture.map((l, i) => (
            <li key={l.id} className="flex items-center gap-1">
              <span className="rounded-md border border-line-strong bg-ink-850 px-2.5 py-1.5 text-fg/85">{l.name}</span>
              {i < architecture.length - 1 && <ChevronRight aria-hidden className="size-4 text-cyan" />}
            </li>
          ))}
        </ol>
      </PageHero>

      <Section labelledBy="status-title" className="!py-0">
        <Container>
          <div className="rounded-2xl border border-line bg-ink-850/60 p-6 sm:p-8">
            <h2 id="status-title" className="font-display text-lg text-fg">How to read this page</h2>
            <StatusLegend className="mt-5" />
          </div>
        </Container>
      </Section>

      {/* Architecture */}
      <Section labelledBy="arch-title">
        <Container>
          <SectionHeading
            id="arch-title"
            eyebrow="System architecture"
            title="Seven layers, one data path."
            intro={<p>Select a layer to see its purpose, what has been built and what is next. Use arrow keys to move between layers.</p>}
          />
          <div className="mt-14"><ArchitectureDiagram /></div>
        </Container>
      </Section>

      {/* Layer deep-dives */}
      <Section labelledBy="layers-title" className="border-t border-line bg-ink-850/40">
        <Container>
          <SectionHeading id="layers-title" eyebrow="Inside the system" title="How each layer works." />
          <div className="mt-6">
            <Layer index="01" title="The physical measurement layer" status="prototyped"
              aside={<Photo photo={photos.prototypeComponents} sizes="(min-width:1024px) 560px, 100vw" className="aspect-[4/3]" position="center 40%" caption="Sensors and edge-node parts for the bench build" />}>
              <p>Everything starts with measurement. Flow sensors fitted to a pipe generate pulses as water passes through them; the pulse rate is proportional to the flow.</p>
              <p>Our core design principle is to <strong className="font-medium text-fg">measure both ends of each pipe section</strong>. When the upstream reading and the downstream reading disagree, the gap points to that section and not to the whole network.</p>
              <p>Alongside flow, we are evaluating water-level and turbidity sensing for reservoirs and inlets.</p>
            </Layer>

            <Layer index="02" title="Embedded systems" status="prototyped" reverse
              aside={<Code title="Edge node loop · simplified" note="illustrative">{`every 5 s:
  pulses   = read_and_reset_counter()
  freq_hz  = pulses / 5
  flow_lpm = freq_hz / k_factor      # sensor-specific
  volume_l += flow_lpm * 5 / 60
  ts       = rtc.now()
  buffer.push({ flow_lpm, volume_l, ts })
  if network.ok: publish(buffer.drain())`}</Code>}>
              <p>At each measurement point, an ESP32 microcontroller counts sensor pulses, converts them into flow rate and cumulative volume, and timestamps every reading.</p>
              <p>This firmware path has been demonstrated in simulation. We are now building the physical node on the bench, adding a real-time clock and local storage so readings are not lost when connectivity drops.</p>
              <p>For remote sites we are exploring battery operation with small solar or in-line micro-hydro harvesting. That work is exploratory.</p>
            </Layer>

            <Layer index="03" title="Data transmission" status="prototyped"
              aside={<Code title="MQTT · topic & payload" note="example">{`topic   droptraq/<zone>/<node>/flow
qos     1

{
  "device": "N-05",
  "flow_rate_lpm": 26.7,
  "total_volume_l": 1530.2,
  "ts": "2026-11-12T06:41:07Z"
}`}</Code>}>
              <p>Readings are published using <strong className="font-medium text-fg">MQTT</strong>, a lightweight publish/subscribe protocol built for small devices and unreliable networks. Devices publish to a broker and the platform subscribes. Nothing has to poll.</p>
              <p>Our prototype uses Wi-Fi. Because many measurement points sit far from Wi-Fi, we are evaluating cellular (GSM/GPRS) modules and low-power mesh radio for field deployments.</p>
            </Layer>

            <Layer index="04" title="Data processing & storage" status="development" reverse
              aside={
                <figure className="rounded-2xl border border-line bg-ink-950 p-6 sm:p-8">
                  <figcaption className="font-mono text-[11px] uppercase tracking-wider text-subtle">Segment balance</figcaption>
                  <p className="mt-6 font-display text-2xl text-fg sm:text-3xl">
                    Δ<sub className="text-base text-muted">segment</sub> = Q<sub className="text-base text-muted">sent</sub> − Q<sub className="text-base text-muted">received</sub>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    Computed over aligned time windows for each pipe section. A balance that stays outside its expected
                    range, especially during low-demand night hours, flags that section for investigation.
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line font-mono text-xs">
                    {[["Ingest", "validate"], ["Align", "by time"], ["Compare", "per segment"]].map(([a, b]) => (
                      <div key={a} className="bg-ink-900 p-3"><p className="text-cyan">{a}</p><p className="text-subtle">{b}</p></div>
                    ))}
                  </div>
                </figure>
              }>
              <p>Incoming messages are validated, aligned in time and written to durable time-series storage, building the historical record that trend analysis and reporting depend on.</p>
              <p>The key computation is the <strong className="font-medium text-fg">segment balance</strong>: for every monitored pipe section, how much water was sent compared with how much was received.</p>
              <p>A local gateway that aggregates the nodes in a zone is in development, so a zone can keep working even when the wider internet link is down.</p>
            </Layer>

            <Layer index="05" title="Monitoring dashboard" status="prototyped"
              aside={
                <div className="rounded-2xl border border-line bg-ink-950 p-6">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">Dashboard capability status</p>
                  <ul className="mt-5 divide-y divide-line">
                    {([
                      ["Live flow rate & total volume over MQTT", "prototyped"],
                      ["Flow history chart", "prototyped"],
                      ["Threshold alert on high flow", "prototyped"],
                      ["Zone overview & segment-balance table", "development"],
                      ["Device health & data-transmission status", "development"],
                      ["Reporting & exports", "planned"],
                    ] as [string, Status][]).map(([t, s]) => (
                      <li key={t} className="flex items-center justify-between gap-4 py-3 text-sm text-fg/90">
                        <span>{t}</span><StatusBadge status={s} className="shrink-0" />
                      </li>
                    ))}
                  </ul>
                </div>
              }>
              <p>Our prototype dashboard connects directly to the MQTT stream and shows live flow rate, cumulative volume, flow history and recent device messages, with an alert when flow passes a configurable threshold.</p>
              <p>The next iteration brings zone overviews, segment-balance tables and device health into one operator view. You can explore a design preview of it on our homepage.</p>
              <ButtonLink href="/#product-title" variant="secondary" arrow>View the interface preview</ButtonLink>
            </Layer>
          </div>
        </Container>
      </Section>

      {/* Future intelligence */}
      <Section labelledBy="future-title" className="border-t border-line">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              id="future-title"
              eyebrow="Future intelligence"
              title="Where the platform is heading."
              intro={<p>These capabilities are part of our product direction. None of them is deployed today.</p>}
            />
            <StatusBadge status="planned" className="self-start lg:self-auto" />
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Anomaly detection", "Learning each segment's normal pattern and flagging departures from it, such as unusual night-time flow."],
              ["Loss localisation", "Ranking pipe sections by likely loss so field teams know where to start."],
              ["Field notifications", "Routing alerts to the right technicians by SMS or app, with context attached."],
              ["Predictive signals", "Using history to anticipate failures and plan maintenance before bursts happen."],
            ].map(([t, b], i) => (
              <Reveal as="li" key={t} delay={i * 0.05} className="rounded-2xl border border-dashed border-line-strong bg-ink-900 p-6">
                <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-lg text-fg">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Roadmap */}
      <Section labelledBy="roadmap-title" className="border-t border-line bg-ink-950">
        <Container>
          <SectionHeading
            id="roadmap-title"
            eyebrow="Product development roadmap"
            title="Prototype first. Then prove it in the field."
            intro={<p>Our roadmap is sequenced by risk: prove the data path, harden the hardware, then pilot. Phases are not tied to public dates.</p>}
          />
          <ol className="relative mt-14 grid gap-4 lg:grid-cols-5">
            {roadmap.map((r, i) => (
              <Reveal as="li" key={r.phase} delay={i * 0.06}
                className={`relative flex flex-col rounded-2xl border p-6 ${r.status === "prototyped" ? "border-cyan/40 bg-cyan/[0.04]" : r.status === "development" ? "border-water/40 bg-ink-900" : "border-dashed border-line-strong bg-ink-900/50"}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-subtle">{r.phase}</span>
                </div>
                <h3 className="mt-3 font-display text-lg leading-snug text-fg">{r.title}</h3>
                <StatusBadge status={r.status} className="mt-3 self-start" />
                <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted">
                  {r.items.map((it) => (
                    <li key={it} className="grid grid-cols-[10px_1fr] gap-2"><span aria-hidden className="mt-2 size-1 rounded-full bg-muted" />{it}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl text-sm text-subtle">
            We share architecture at the level that helps partners understand our approach. Detailed designs,
            firmware and calibration methods are not published here.
          </p>
        </Container>
      </Section>

      <Section labelledBy="tech-cta" className="border-t border-line !py-20">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <h2 id="tech-cta" className="max-w-2xl font-display text-2xl font-medium text-fg sm:text-3xl">
            Engineer, operator or technology partner? We would like to compare notes.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact?type=partnership" arrow>Technology partnerships</ButtonLink>
            <ButtonLink href="/contact?type=talent" variant="secondary">Join the build</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
