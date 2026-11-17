import type { Metadata } from "next";
import { InsightsBrowser } from "@/components/insights/insights-browser";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { topics } from "@/content/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Company updates and engineering writing from DropTraQ on IoT, embedded systems, water distribution and infrastructure intelligence.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={<>Notes from the <span className="text-gradient">build.</span></>}
        intro={
          <p>
            Company updates and engineering writing on IoT, embedded systems, water distribution and infrastructure
            intelligence, written by the people building DropTraQ.
          </p>
        }
      >
        <ul aria-label="Topics we cover" className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <li key={t} className="rounded-md border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted">{t}</li>
          ))}
        </ul>
      </PageHero>

      <Section labelledBy="page-title" className="!pt-0">
        <Container>
          <InsightsBrowser />
        </Container>
      </Section>

      <Section labelledBy="insights-cta" className="border-t border-line !py-20">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 id="insights-cta" className="font-display text-2xl font-medium sm:text-3xl">Want to contribute or collaborate on research?</h2>
            <p className="mt-3 text-muted">We welcome conversations with engineers, researchers and operators.</p>
          </div>
          <ButtonLink href="/contact" arrow>Get in Touch</ButtonLink>
        </Container>
      </Section>
    </>
  );
}
