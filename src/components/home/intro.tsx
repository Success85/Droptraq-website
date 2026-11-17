import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { photos } from "@/content/site";

const points = [
  ["Where does the water go?", "Water passes through treatment, storage and many kilometres of pipe before it reaches a tap. Most of that journey happens underground."],
  ["Visibility comes before efficiency", "When operators can see flow at more points in the network, they can compare what was sent with what arrived and spot the gaps."],
  ["From readings to decisions", "We turn physical flow into timely digital information, so teams know where to look and when to act."],
];

export function Intro() {
  return (
    <Section labelledBy="intro-title" className="border-t border-line">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="intro-title"
            eyebrow="Who we are"
            title="Making Invisible Infrastructure Visible."
            intro={
              <p>
                DropTraQ is an independent team of engineers in Rwanda building technology for a real infrastructure
                challenge: knowing how water actually moves through a distribution network.
              </p>
            }
          />
          <ol className="mt-12 space-y-8">
            {points.map(([t, b], i) => (
              <Reveal as="li" key={t} delay={i * 0.06} className="grid grid-cols-[auto_1fr] gap-5">
                <span className="font-mono text-sm text-cyan">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-lg font-medium text-fg">{t}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{b}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="relative lg:col-span-7" y={28}>
          <div className="grid grid-cols-6 grid-rows-[auto_auto] gap-4">
            <Photo
              photo={photos.teamWorkingSession}
              sizes="(min-width:1024px) 680px, 100vw"
              className="col-span-6 aspect-[16/10]"
              caption="The DropTraQ team · development session"
            />
            <Photo
              photo={photos.prototypeComponents}
              sizes="(min-width:1024px) 300px, 50vw"
              className="col-span-6 aspect-[16/10] sm:col-span-2 sm:aspect-[4/5]"
              caption="Edge-node parts on the bench"
            />
            <div className="col-span-6 flex flex-col justify-between rounded-2xl border border-line bg-ink-850 p-6 sm:col-span-4 sm:p-7">
              <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">Our position</p>
              <p className="mt-4 font-display text-lg leading-snug text-fg sm:text-2xl">
                An independent team of engineers building technology to address real infrastructure challenges.
              </p>
              <p className="mt-4 text-sm text-muted">Early stage. Prototype first. Honest about what is built and what is next.</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
