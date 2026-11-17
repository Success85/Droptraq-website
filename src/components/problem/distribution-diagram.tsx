"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/cn";

const stages = [
  {
    id: "source", name: "Source & intake", x: 60,
    what: "Raw water is drawn from rivers, lakes or boreholes.",
    risk: "Abstraction volumes may be estimated rather than continuously measured.",
    seen: "Intake flow gives the starting figure for the whole balance.",
  },
  {
    id: "treatment", name: "Treatment", x: 180,
    what: "Water is cleaned and made safe to drink.",
    risk: "Process water and backwash use can blur how much clean water actually leaves the plant.",
    seen: "Outlet flow establishes the system input volume.",
  },
  {
    id: "transmission", name: "Transmission mains", x: 300,
    what: "Large pipes carry treated water, often over long distances and elevation changes.",
    risk: "Leaks on large mains can be big, and may go unnoticed if they drain underground.",
    seen: "Measuring both ends of a main shows whether water is lost along it.",
  },
  {
    id: "storage", name: "Storage reservoirs", x: 420,
    what: "Reservoirs balance supply and demand and maintain pressure.",
    risk: "Overflows and structural leaks waste treated water.",
    seen: "Level and inflow/outflow reveal overflow events and unexplained drops.",
  },
  {
    id: "distribution", name: "Distribution network", x: 540,
    what: "A branching web of smaller pipes delivers water to neighbourhoods.",
    risk: "Most leaks, illegal connections and bypasses happen here, spread across many kilometres.",
    seen: "Segment-level balances narrow a loss to a specific section of pipe.",
  },
  {
    id: "customers", name: "Connections & customers", x: 660,
    what: "Service pipes connect homes, kiosks and businesses through customer meters.",
    risk: "Meter inaccuracy and unauthorised use create apparent losses; readings may be infrequent.",
    seen: "Comparing delivered volume with metered use closes the balance.",
  },
];

export function DistributionDiagram() {
  const [active, setActive] = useState(4);
  const [monitored, setMonitored] = useState(true);
  const reduce = useReducedMotion();
  const s = stages[active];
  // Typical visibility: only the input and the billing meters are known.
  const isSeen = (i: number) => monitored || i === 1 || i === 5;

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-ink-850/70">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted">Water&apos;s journey · conceptual</p>
        <div role="group" aria-label="Visibility mode" className="inline-flex rounded-full border border-line p-0.5 text-xs">
          <button type="button" aria-pressed={!monitored} onClick={() => setMonitored(false)}
            className={cn("inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 transition-colors", !monitored ? "bg-ink-700 text-fg" : "text-muted hover:text-fg")}>
            <EyeOff aria-hidden className="size-3.5" />Typical visibility
          </button>
          <button type="button" aria-pressed={monitored} onClick={() => setMonitored(true)}
            className={cn("inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 transition-colors", monitored ? "bg-cyan/15 text-cyan" : "text-muted hover:text-fg")}>
            <Eye aria-hidden className="size-3.5" />Segment monitoring
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox="0 0 720 210" className="block h-auto w-full min-w-[640px]" role="img"
          aria-label={`Distribution stages from source to customers. ${monitored ? "With segment monitoring, every stage boundary is measured." : "With typical visibility, only treatment output and customer billing are measured."}`}>
          <path d="M60 110H660" stroke="#d6e2eb" strokeWidth={12} strokeLinecap="round" />
          {stages.slice(0, -1).map((st, i) => {
            const seen = isSeen(i) && isSeen(i + 1);
            return (
              <path key={st.id} d={`M${st.x + 14} 110H${stages[i + 1].x - 14}`} stroke={seen ? "#2589d8" : "#b8c8d5"}
                strokeWidth={2.5} strokeDasharray={seen ? "6 6" : "2 6"} className={seen && !reduce ? "animate-dash" : ""} />
            );
          })}
          {!monitored && (
            <g>
              <rect x={232} y={70} width={378} height={80} rx={10} fill="none" stroke="#8396a5" strokeOpacity={0.35} strokeDasharray="4 5" />
              <text x={421} y={64} textAnchor="middle" className="fill-subtle font-mono text-[10px] tracking-widest">LIMITED VISIBILITY</text>
            </g>
          )}
          {stages.map((st, i) => {
            const on = i === active;
            const seen = isSeen(i);
            return (
              <g key={st.id} role="button" tabIndex={0} aria-pressed={on} aria-label={`${st.name}${seen ? ", measured" : ", not measured"}`}
                onClick={() => setActive(i)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(i); } }}
                className="cursor-pointer outline-none [&:focus-visible>circle:nth-child(2)]:stroke-fg">
                <circle cx={st.x} cy={110} r={22} fill="transparent" />
                <circle cx={st.x} cy={110} r={on ? 16 : 13} className={cn("transition-all duration-300", on ? "fill-ink-700" : "fill-ink-850")}
                  stroke={seen ? "#12a7ba" : "#b8c8d5"} strokeWidth={on ? 2 : 1.4} strokeDasharray={seen ? undefined : "3 3"} />
                <text x={st.x} y={114} textAnchor="middle" className={cn("font-mono text-[11px]", on ? "fill-fg" : "fill-muted")}>{i + 1}</text>
                {seen && <circle cx={st.x + 12} cy={98} r={4} fill="#12a7ba" />}
                <text x={st.x} y={150} textAnchor="middle" className={cn("font-display text-[11px]", on ? "fill-fg" : "fill-subtle")}>
                  {st.name.split(" ")[0]}
                </text>
              </g>
            );
          })}
          {monitored && (
            <g>
              <path d="M548 80 L532 80" stroke="#c97c0e" />
              <rect x={448} y={34} width={184} height={30} rx={6} fill="#ffffff" stroke="#c97c0e" strokeOpacity={0.6} />
              <text x={540} y={53} textAnchor="middle" className="fill-amber font-mono text-[10px]">loss located: section D-4</text>
            </g>
          )}
        </svg>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={`${s.id}-${monitored}`} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }} className="grid gap-px border-t border-line bg-line sm:grid-cols-3">
          <div className="bg-ink-900 p-5 sm:p-6">
            <p className="font-mono text-[10.5px] uppercase tracking-wider text-subtle">Stage {active + 1} · {s.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-fg/90">{s.what}</p>
          </div>
          <div className="bg-ink-900 p-5 sm:p-6">
            <p className="font-mono text-[10.5px] uppercase tracking-wider text-amber">What can go unseen</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.risk}</p>
          </div>
          <div className="bg-ink-900 p-5 sm:p-6">
            <p className="font-mono text-[10.5px] uppercase tracking-wider text-cyan">{isSeen(active) ? "What measurement shows" : "Not measured in this view"}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {isSeen(active) ? s.seen : "Without a measurement point here, losses at this stage can only be inferred from the overall total."}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
