"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Activity, Cpu, Database, Gauge, LayoutDashboard, Lightbulb, RadioTower,
} from "lucide-react";
import { architecture } from "@/content/technology";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/cn";

const icons = {
  sensor: Gauge, controller: Cpu, comms: RadioTower, processing: Activity,
  database: Database, dashboard: LayoutDashboard, insights: Lightbulb,
} as const;

const statusRing = {
  prototyped: "border-cyan/60",
  development: "border-water/60",
  planned: "border-dashed border-line-strong",
};

export function ArchitectureDiagram() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const layer = architecture[active];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = architecture.length;
    const map: Record<string, number> = {
      ArrowRight: (i + 1) % n, ArrowDown: (i + 1) % n,
      ArrowLeft: (i - 1 + n) % n, ArrowUp: (i - 1 + n) % n, Home: 0, End: n - 1,
    };
    if (!(e.key in map)) return;
    e.preventDefault();
    setActive(map[e.key]);
    refs.current[map[e.key]]?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Chain */}
      <div className="relative min-w-0 lg:col-span-5">
        <div aria-hidden className="absolute bottom-8 left-[27px] top-8 w-px bg-gradient-to-b from-cyan/60 via-water/50 to-line-strong" />
        {!reduce && (
          <motion.span
            aria-hidden
            className="absolute left-[25px] size-[5px] rounded-full bg-cyan-bright shadow-[0_0_10px_2px_rgba(36,200,216,0.7)]"
            animate={{ top: ["6%", "94%"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
          />
        )}
        <div role="tablist" aria-orientation="vertical" aria-label="System architecture layers" className="relative space-y-2">
          {architecture.map((l, i) => {
            const Icon = icons[l.id as keyof typeof icons];
            const on = i === active;
            return (
              <button
                key={l.id}
                ref={(el) => { refs.current[i] = el; }}
                role="tab"
                id={`arch-tab-${l.id}`}
                aria-selected={on}
                aria-controls="arch-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "group flex w-full items-center gap-4 rounded-xl border p-2 pr-4 text-left transition-colors duration-200",
                  on ? "border-cyan/40 bg-ink-800" : "border-transparent hover:bg-ink-850",
                )}
              >
                <span className={cn("relative z-10 inline-flex size-10 shrink-0 items-center justify-center rounded-lg border bg-ink-900", statusRing[l.status], on ? "text-cyan" : "text-muted")}>
                  <Icon aria-hidden className="size-5" strokeWidth={1.6} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-subtle">{String(i + 1).padStart(2, "0")} · {l.short}</span>
                  <span className={cn("block truncate font-display text-base", on ? "text-fg" : "text-fg/80")}>{l.name}</span>
                </span>
                <StatusBadge status={l.status} className="hidden sm:inline-flex" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail */}
      <div className="min-w-0 lg:col-span-7">
        <div className="sticky top-28 overflow-hidden rounded-2xl border border-line bg-ink-850/80">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={layer.id}
              id="arch-panel"
              role="tabpanel"
              aria-labelledby={`arch-tab-${layer.id}`}
              initial={reduce ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
              className="p-6 sm:p-9"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="eyebrow">Layer {String(active + 1).padStart(2, "0")} of {architecture.length}</p>
                <StatusBadge status={layer.status} />
              </div>
              <h3 className="mt-5 font-display text-2xl font-medium text-fg sm:text-3xl">{layer.name}</h3>
              <p className="mt-4 text-lg leading-relaxed text-fg/85">{layer.purpose}</p>
              <ul className="mt-7 space-y-4">
                {layer.details.map((d) => (
                  <li key={d} className="grid grid-cols-[14px_1fr] gap-3 text-[0.95rem] leading-relaxed text-muted">
                    <span aria-hidden className="mt-2.5 h-px w-3 bg-cyan" />
                    {d}
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-line pt-6">
                <p className="font-mono text-[10.5px] uppercase tracking-wider text-subtle">Building blocks</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {layer.tech.map((t) => (
                    <li key={t} className="rounded-md border border-line-strong bg-ink-900 px-2.5 py-1 font-mono text-xs text-fg/85">{t}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <button type="button" onClick={() => setActive((a) => Math.max(0, a - 1))} disabled={active === 0}
                  className="min-h-10 rounded-full px-1 text-sm text-muted hover:text-fg disabled:opacity-30">← Upstream</button>
                <button type="button" onClick={() => setActive((a) => Math.min(architecture.length - 1, a + 1))} disabled={active === architecture.length - 1}
                  className="min-h-10 rounded-full px-1 text-sm text-cyan hover:text-cyan-soft disabled:opacity-30">Downstream →</button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
