import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { Milestones } from "@/components/ui/milestones";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { publishedInsights } from "@/content/insights";

export const metadata: Metadata = {
  title: "News & Milestones",
  description:
    "DropTraQ's progress so far: field research with Rwanda's water sector, prototype engineering, prize funding and company news.",
  alternates: { canonical: "/insights" },
};

const fmtDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function InsightsPage() {
  const posts = publishedInsights();
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={<>News &amp; <span className="text-gradient">milestones.</span></>}
        intro={<p>Where DropTraQ is today: what we have researched, built and won, and what is happening next.</p>}
      />

      <Section labelledBy="milestones-title" className="!pt-0">
        <Container>
          <SectionHeading id="milestones-title" eyebrow="Milestones" title="Progress so far." />
          <Milestones className="mt-10" />
        </Container>
      </Section>

      {posts.length > 0 && (
        <Section labelledBy="news-title" className="border-t border-line">
          <Container>
            <SectionHeading id="news-title" eyebrow="Company news" title="Latest from the team." />
            <ul className="mt-10 grid gap-4">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/insights/${p.slug}`}
                    className="group grid gap-6 rounded-2xl border border-line bg-ink-850 p-6 transition-colors hover:border-cyan/40 sm:p-9 md:grid-cols-12">
                    <div className="md:col-span-3">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-cyan">{p.topic}</p>
                      {p.date && <p className="mt-2 text-sm text-muted"><time dateTime={p.date}>{fmtDate(p.date)}</time></p>}
                      {p.readingTime && <p className="mt-1 flex items-center gap-1.5 text-xs text-subtle"><Clock aria-hidden className="size-3" />{p.readingTime}</p>}
                    </div>
                    <div className="md:col-span-8">
                      <h3 className="font-display text-2xl leading-snug text-fg transition-colors group-hover:text-cyan sm:text-3xl">{p.title}</h3>
                      <p className="mt-3 leading-relaxed text-muted">{p.summary}</p>
                    </div>
                    <div className="md:col-span-1 md:flex md:justify-end">
                      <ArrowUpRight aria-hidden className="size-6 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <Section labelledBy="insights-cta" className="border-t border-line !py-20">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 id="insights-cta" className="font-display text-2xl font-medium sm:text-3xl">Working on water losses in Rwanda or beyond?</h2>
            <p className="mt-3 text-muted">We welcome conversations with operators, engineers, researchers and funders.</p>
          </div>
          <ButtonLink href="/contact" arrow>Get in Touch</ButtonLink>
        </Container>
      </Section>
    </>
  );
}
