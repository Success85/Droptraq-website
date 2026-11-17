import type { Metadata } from "next";
import { TeamProfiles } from "@/components/about/team-profiles";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { photos, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "DropTraQ is an independent, engineering-led startup in Kigali building intelligent monitoring for water distribution systems. Our story, mission, vision, team and values.",
  alternates: { canonical: "/about" },
};

const philosophy = [
  ["Prototype before promising", "We prove each part of the data path on the bench before we describe it as working."],
  ["Design for the field", "Intermittent power and connectivity, dust and water: real conditions shape every design decision."],
  ["Measure what matters", "More data is not the goal. The right measurement at the right point is."],
  ["Interfaces for decisions", "A dashboard succeeds when an operator knows what to do next, not when it shows everything."],
];

const values = [
  ["Engineering excellence", "We hold our hardware, firmware and software to standards we would trust on critical infrastructure."],
  ["Practical innovation", "We favour solutions that can be installed, maintained and afforded in the places that need them."],
  ["Transparency", "We are clear about what we have built, what we are building and what is still an idea."],
  ["Accountability", "We take ownership of our work and our commitments, and we build tools that help others do the same."],
  ["Collaboration", "Infrastructure is a shared responsibility. We learn from operators, engineers and communities."],
  ["Real-world impact", "Success is measured in water that reaches people, not in features shipped."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About DropTraQ"
        title={<>Engineers working on a <span className="text-gradient">problem that matters.</span></>}
        intro={
          <p>
            DropTraQ is an independent technology startup based in {site.location}. We are developing intelligent
            monitoring for water distribution systems, starting with the question every operator faces: where does the
            water go?
          </p>
        }
      />

      {/* Who we are */}
      <Section labelledBy="who-title" className="!pt-0">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Photo photo={photos.teamInnovationHub} sizes="(min-width:1024px) 700px, 100vw" className="aspect-[4/3]" position="center 30%" preload
              caption="The DropTraQ team in Kigali" />
          </Reveal>
          <div className="lg:col-span-5 lg:pt-6">
            <SectionHeading
              id="who-title"
              eyebrow="Who we are"
              title="A young company with a long view."
              intro={
                <>
                  <p>
                    We are a team of engineers and builders working across IoT, embedded systems, electronics and
                    software. We are early stage. Our work today is prototyping, field learning and building the
                    foundations of a monitoring platform.
                  </p>
                  <p className="mt-4">
                    We started in Rwanda because the problem is here and so are we. We are building with the ambition
                    to serve infrastructure operators across Africa and beyond.
                  </p>
                </>
              }
            />
          </div>
        </Container>
      </Section>

      {/* Why */}
      <Section labelledBy="why-title" className="border-t border-line bg-ink-850/40">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading
              id="why-title"
              eyebrow="Why we are building DropTraQ"
              title="Because what you cannot see, you cannot manage."
              intro={
                <>
                  <p>
                    Treated water is one of the most valuable things a city produces. Yet in many distribution
                    networks, a significant share never reaches a paying customer, and operators often cannot tell
                    exactly where it was lost.
                  </p>
                  <p className="mt-4">
                    Affordable sensors, capable microcontrollers and modern messaging protocols make it possible to
                    measure far more of a network than before. We want to make that visibility practical for the
                    operators who need it.
                  </p>
                </>
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            <Reveal><Photo photo={photos.conceptSketch} sizes="(min-width:1024px) 320px, 50vw" className="aspect-[3/4]" caption="Early network sketch" /></Reveal>
            <Reveal delay={0.06} className="pt-10"><Photo photo={photos.prototypeWiring} sizes="(min-width:1024px) 320px, 50vw" className="aspect-[3/4]" caption="Bench prototype parts" /></Reveal>
          </div>
        </Container>
      </Section>

      {/* Mission & vision */}
      <Section labelledBy="mv-title" className="border-t border-line">
        <Container>
          <h2 id="mv-title" className="sr-only">Mission and vision</h2>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-2">
            {[["Our mission", site.mission], ["Our vision", site.vision]].map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.06} className="relative bg-ink-900 p-8 sm:p-12">
                <p className="eyebrow">{k}</p>
                <p className="mt-6 font-display text-2xl leading-snug text-fg sm:text-[2rem]">{v}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Philosophy */}
      <Section labelledBy="philosophy-title" className="border-t border-line bg-ink-950">
        <Container className="grid gap-12 lg:grid-cols-12">
          <SectionHeading
            id="philosophy-title"
            className="lg:col-span-4"
            eyebrow="Engineering philosophy"
            title="How we build."
          />
          <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
            {philosophy.map(([t, b], i) => (
              <Reveal as="li" key={t} delay={i * 0.05} className="border-t border-line-strong pt-6">
                <span className="font-mono text-xs text-cyan">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-xl text-fg">{t}</h3>
                <p className="mt-2 leading-relaxed text-muted">{b}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Team */}
      <Section id="team" labelledBy="team-title" className="border-t border-line">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              id="team-title"
              eyebrow="Our team"
              title="The people behind DropTraQ."
              intro={<p>A founding team that designs, builds, tests and goes to the field together.</p>}
            />
            <ButtonLink href="/contact?type=talent" arrow className="self-start lg:self-auto">Build With Us</ButtonLink>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <Reveal className="md:col-span-2">
              <Photo photo={photos.teamWorkingSession} sizes="(min-width:768px) 800px, 100vw" className="aspect-[16/10]" caption="Development session" />
            </Reveal>
            <Reveal delay={0.06}>
              <Photo photo={photos.teamDesignReview} sizes="(min-width:768px) 400px, 100vw" className="aspect-[16/10] md:aspect-auto md:h-full" caption="Design review" />
            </Reveal>
          </div>
          <TeamProfiles className="mt-12" />
        </Container>
      </Section>

      {/* Field learning */}
      <Section labelledBy="field-title" className="border-t border-line bg-ink-850/40">
        <Container>
          <SectionHeading
            id="field-title"
            eyebrow="Learning from the field"
            title="We go where the water is."
            intro={
              <p>
                To design for real infrastructure we need to understand it first-hand. Our team has made learning visits
                to operating water facilities to see intake, treatment, pumping and control in practice, and to listen
                to the engineers who run them.
              </p>
            }
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [photos.fieldIntake, "Raw-water intake", "sm:col-span-2 aspect-[4/3]"],
              [photos.fieldFiltration, "Filtration beds", "aspect-[3/4] lg:aspect-auto"],
              [photos.pumpRoom, "Pump room", "aspect-[3/4] lg:aspect-auto"],
            ].map(([p, c, cls], i) => (
              <Reveal key={c as string} delay={i * 0.05} className={cls as string}>
                <Photo photo={p as typeof photos.fieldIntake} sizes="(min-width:1024px) 600px, 50vw" className="h-full" caption={c as string} />
              </Reveal>
            ))}
          </div>
          <p className="mt-6 max-w-3xl rounded-xl border border-line bg-ink-900 px-5 py-4 text-sm leading-relaxed text-muted">
            <span className="font-medium text-fg">Note:</span> these photographs document educational field visits.
            They do not show DropTraQ technology installed at these sites, and they do not imply a partnership with, or
            endorsement by, the facilities&apos; operators.
          </p>
        </Container>
      </Section>

      {/* Values */}
      <Section labelledBy="values-title" className="border-t border-line">
        <Container>
          <SectionHeading id="values-title" eyebrow="Our values" title="What we hold ourselves to." />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {values.map(([t, b], i) => (
              <Reveal as="li" key={t} delay={(i % 3) * 0.05} className="group bg-ink-900 p-7 transition-colors hover:bg-ink-850 sm:p-9">
                <span aria-hidden className="block h-px w-8 bg-cyan transition-all duration-300 group-hover:w-16" />
                <h3 className="mt-6 font-display text-xl text-fg">{t}</h3>
                <p className="mt-3 leading-relaxed text-muted">{b}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section labelledBy="about-cta" className="border-t border-line !py-20">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <h2 id="about-cta" className="max-w-2xl font-display text-2xl font-medium sm:text-3xl">
            We are looking for engineers, operators and partners who want to build this with us.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact?type=talent" arrow>Build With Us</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">Get in Touch</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
