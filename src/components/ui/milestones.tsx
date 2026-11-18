import Link from "next/link";
import { ArrowUpRight, Cpu, Microscope, Trophy, Users } from "lucide-react";
import { milestones, type Milestone } from "@/content/milestones";
import { Reveal } from "./reveal";
import { cn } from "@/lib/cn";

const icons: Record<Milestone["kind"], typeof Cpu> = { build: Cpu, research: Microscope, funding: Trophy, team: Users };
const kindLabel: Record<Milestone["kind"], string> = { build: "Engineering", research: "Field research", funding: "Funding", team: "Team" };

/** Horizontal timeline on wide screens, vertical list on phones. */
export function Milestones({ className }: { className?: string }) {
  return (
    <ol className={cn("relative grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
      {milestones.map((m, i) => {
        const Icon = icons[m.kind];
        const body = (
          <>
            <div className="flex items-center justify-between gap-3">
              <span className={cn("inline-flex size-10 items-center justify-center rounded-xl border",
                m.highlight ? "border-cyan/40 bg-cyan/10 text-cyan" : "border-line-strong bg-ink-800 text-cyan")}>
                <Icon aria-hidden className="size-5" strokeWidth={1.6} />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-subtle">{m.date ?? kindLabel[m.kind]}</span>
            </div>
            {m.highlight && <p className="mt-6 font-display text-4xl font-semibold tracking-tight text-cyan">{m.highlight}</p>}
            <h3 className={cn("font-display text-lg leading-snug text-fg", m.highlight ? "mt-2" : "mt-6")}>{m.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{m.detail}</p>
            {m.href && (
              <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-cyan">
                Read more <ArrowUpRight aria-hidden className="size-3.5" />
              </span>
            )}
          </>
        );
        const cardCls = cn("flex h-full flex-col rounded-2xl border bg-ink-850 p-6 transition-colors",
          m.highlight ? "border-cyan/40" : "border-line", m.href && "hover:border-cyan/50");
        return (
          <Reveal as="li" key={m.title} delay={i * 0.05}>
            {m.href ? <Link href={m.href} className={cardCls}>{body}</Link> : <div className={cardCls}>{body}</div>}
          </Reveal>
        );
      })}
    </ol>
  );
}
