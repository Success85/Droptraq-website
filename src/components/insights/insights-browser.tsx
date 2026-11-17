"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Clock, PenLine } from "lucide-react";
import { insights, topics, type Topic } from "@/content/insights";
import { cn } from "@/lib/cn";

const fmtDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function InsightsBrowser() {
  const [topic, setTopic] = useState<Topic | "All">("All");
  const used = topics.filter((t) => insights.some((i) => i.topic === t));
  const list = insights.filter((i) => topic === "All" || i.topic === topic);
  const published = list.filter((i) => i.status === "published");
  const planned = list.filter((i) => i.status === "in-preparation");

  return (
    <div>
      <div role="group" aria-label="Filter by topic" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {(["All", ...used] as const).map((t) => (
          <button key={t} type="button" onClick={() => setTopic(t)} aria-pressed={topic === t}
            className={cn("min-h-10 shrink-0 rounded-full border px-4 text-sm transition-colors",
              topic === t ? "border-cyan/60 bg-cyan/10 text-fg" : "border-line-strong text-muted hover:text-fg")}>
            {t}
          </button>
        ))}
      </div>

      {published.length > 0 && (
        <div className="mt-12">
          <h2 className="font-mono text-[11px] uppercase tracking-wider text-subtle">Published</h2>
          <ul className="mt-5 grid gap-4">
            {published.map((p) => (
              <li key={p.slug}>
                <Link href={`/insights/${p.slug}`}
                  className="group grid gap-6 rounded-2xl border border-line bg-ink-850/60 p-6 transition-colors hover:border-cyan/40 hover:bg-ink-850 sm:p-9 md:grid-cols-12">
                  <div className="md:col-span-3">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-cyan">{p.topic}</p>
                    {p.date && <p className="mt-2 text-sm text-muted"><time dateTime={p.date}>{fmtDate(p.date)}</time></p>}
                    {p.readingTime && <p className="mt-1 flex items-center gap-1.5 text-xs text-subtle"><Clock aria-hidden className="size-3" />{p.readingTime}</p>}
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="font-display text-2xl leading-snug text-fg transition-colors group-hover:text-cyan-soft sm:text-3xl">{p.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{p.summary}</p>
                  </div>
                  <div className="md:col-span-1 md:flex md:justify-end">
                    <ArrowUpRight aria-hidden className="size-6 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {planned.length > 0 && (
        <div className="mt-14">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-mono text-[11px] uppercase tracking-wider text-subtle">In preparation</h2>
            <p className="text-xs text-subtle">Topics our team is writing about. Not yet published.</p>
          </div>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {planned.map((p) => (
              <li key={p.slug} className="flex flex-col rounded-2xl border border-dashed border-line-strong bg-ink-900/60 p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{p.topic}</span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-line-strong px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-subtle">
                    <PenLine aria-hidden className="size-3" />Draft
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg leading-snug text-fg/90">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {list.length === 0 && <p className="mt-12 text-muted">Nothing in this topic yet.</p>}
    </div>
  );
}
