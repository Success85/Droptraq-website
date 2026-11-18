import { HeroNetwork } from "./hero-network";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-40">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div aria-hidden className="absolute -right-40 -top-40 -z-10 size-[640px] rounded-full bg-[radial-gradient(circle,rgba(36,200,216,0.13),transparent_65%)]" />
      <div aria-hidden className="absolute -left-60 top-1/2 -z-10 size-[560px] rounded-full bg-[radial-gradient(circle,rgba(37,137,216,0.12),transparent_65%)]" />

      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
              <span aria-hidden className="h-px w-8 bg-cyan/60" />
              IoT · Water infrastructure intelligence · Rwanda
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 id="hero-title" className="mt-6 font-display text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.4rem]">
              Bringing Intelligence to <span className="text-gradient">Every Drop.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 font-display text-xl leading-snug text-fg/90 sm:text-2xl">
              Building connected infrastructure intelligence for smarter water distribution.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              DropTraQ is developing IoT-powered monitoring solutions that transform water-flow data into actionable
              insights, helping infrastructure operators understand distribution, identify potential losses, and make
              better decisions.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/technology" arrow>Explore Our Technology</ButtonLink>
              <ButtonLink href="/#team" variant="secondary">Meet the Team</ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line text-sm">
              {[
                ["Stage", "Prototype"],
                ["Edge", "ESP32"],
                ["Telemetry", "MQTT"],
              ].map(([k, v]) => (
                <div key={k} className="bg-ink-900 px-4 py-3">
                  <dt className="font-mono text-[10.5px] uppercase tracking-wider text-subtle">{k}</dt>
                  <dd className="mt-1 font-display text-fg">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.15} y={24} className="lg:col-span-6">
          <HeroNetwork />
          <p className="mt-3 text-xs leading-relaxed text-subtle">
            Illustrative zone with simulated readings. Hover or tap a node. Measuring both ends of every pipe section
            lets a loss be traced to the section where it occurs.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
