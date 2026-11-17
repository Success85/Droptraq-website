import { Container } from "./container";
import { Reveal } from "./reveal";

export function PageHero({
  eyebrow, title, intro, children,
}: { eyebrow: string; title: React.ReactNode; intro?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div aria-hidden className="absolute -right-32 -top-32 -z-10 size-[520px] rounded-full bg-[radial-gradient(circle,rgba(36,200,216,0.12),transparent_65%)]" />
      <Container>
        <Reveal>
          <p className="eyebrow flex items-center gap-3"><span aria-hidden className="h-px w-8 bg-cyan/60" />{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 id="page-title" className="mt-6 max-w-4xl font-display text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-6xl lg:text-[4.2rem]">
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.1}>
            <div className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">{intro}</div>
          </Reveal>
        )}
        {children && <Reveal delay={0.15} className="mt-10">{children}</Reveal>}
      </Container>
    </section>
  );
}
