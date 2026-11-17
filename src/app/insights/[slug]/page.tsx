import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { publishedInsights } from "@/content/insights";
import { site } from "@/content/site";

export function generateStaticParams() {
  return publishedInsights().map((i) => ({ slug: i.slug }));
}

async function getInsight(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  return publishedInsights().find((i) => i.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const post = await getInsight(params);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.summary, publishedTime: post.date },
  };
}

export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const post = await getInsight(params);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    publisher: { "@type": "Organization", name: site.name },
  };
  const date = new Date(`${post.date}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

  return (
    <article className="relative pb-24 pt-36 sm:pt-44">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div aria-hidden className="bg-grid absolute inset-x-0 top-0 -z-10 h-[520px]" />
      <Container className="max-w-3xl">
        <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
          <ArrowLeft aria-hidden className="size-4" /> All insights
        </Link>
        <p className="eyebrow mt-10">{post.topic}</p>
        <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-[-0.025em] sm:text-5xl">{post.title}</h1>
        <p className="mt-6 font-mono text-xs uppercase tracking-wider text-subtle">
          <time dateTime={post.date}>{date}</time>{post.readingTime && ` · ${post.readingTime}`} · DropTraQ
        </p>
        <p className="mt-10 border-l-2 border-cyan pl-5 text-xl leading-relaxed text-fg/90">{post.summary}</p>
        <div className="mt-10 space-y-6 text-[1.06rem] leading-[1.8] text-muted">
          {post.body?.map((para) => <p key={para}>{para}</p>)}
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-10 sm:flex-row">
          <ButtonLink href="/contact?type=talent" arrow>Engineering talent</ButtonLink>
          <ButtonLink href="/insights" variant="secondary">More insights</ButtonLink>
        </div>
      </Container>
    </article>
  );
}
