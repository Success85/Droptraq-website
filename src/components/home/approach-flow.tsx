"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Activity, BellRing, Cpu, Gauge, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/cn";

const stages = [
  {
    key: "measure",
    label: "Measure",
    icon: Gauge,
    summary: "Flow sensors capture water movement.",
    detail:
      "Sensors installed on the pipe produce a signal proportional to the water passing through, typically a stream of pulses. Placing sensors at both ends of a pipe section is what later makes a loss locatable.",
    artifactTitle: "Sensor signal",
    artifact: "pulses      ▮▮ ▮▮▮ ▮▮ ▮▮▮▮ ▮▮ ▮▮▮\nwindow      5 s\ncount       412\nfrequency   82.4 Hz",
  },
  {
    key: "connect",
    label: "Connect",
    icon: Cpu,
    summary: "Embedded devices collect and transmit measurements.",
    detail:
      "An ESP32 microcontroller counts pulses, converts them into flow rate and cumulative volume, timestamps each reading and publishes it over MQTT, a lightweight messaging protocol built for constrained devices.",
    artifactTitle: "MQTT payload",
    artifact: '{\n  "device": "N-05",\n  "flow_rate_lpm": 26.7,\n  "total_volume_l": 1530.2,\n  "ts": "…T06:41:07Z"\n}',
  },
  {
    key: "process",
    label: "Process",
    icon: Activity,
    summary: "Data is received and processed through the system.",
    detail:
      "Incoming messages are validated, aligned in time and stored. Readings from each end of a pipe section are compared to calculate a segment balance: water sent minus water received.",
    artifactTitle: "Segment balance",
    artifact: "segment    S-05  Junction → Zone B\nsent       31.0 L/min\nreceived   26.7 L/min\nbalance    −13.9 %   ▲ above threshold",
  },
  {
    key: "visualize",
    label: "Visualize",
    icon: LayoutDashboard,
    summary: "Information is presented through a centralized dashboard.",
    detail:
      "Operators see flow, device health and segment balances in one place, with history for comparison. The goal is clarity: what is normal, what has changed, and where.",
    artifactTitle: "Dashboard tile",
    artifact: "ZONE B INLET        ● online\nflow      26.7 L/min\n24 h      ▁▂▅▇▆▃▂▂▃▆▇▅▃▂▁\nbalance   −13.9 %",
  },
  {
    key: "act",
    label: "Act",
    icon: BellRing,
    summary: "Operators can investigate discrepancies and respond more effectively.",
    detail:
      "When a balance moves outside its expected range, an alert points the team to a specific pipe section rather than a whole district, so investigation starts in the right place.",
    artifactTitle: "Alert",
    artifact: "ALERT  segment S-05\nreason sustained imbalance > 10 %\nsince  02:10 (night flow)\naction inspect Junction → Zone B",
  },
];

export function ApproachFlow() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = stages[active];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % stages.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + stages.length) % stages.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = stages.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      {/* Pipeline track */}
      <div className="relative">
        <div aria-hidden className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-line-strong md:block" />
        <motion.div
          aria-hidden
          className="absolute left-[10%] top-7 hidden h-px bg-gradient-to-r from-cyan to-water md:block"
          animate={{ width: `${(active / (stages.length - 1)) * 80}%` }}
          transition={{ duration: reduce ? 0 : 0.6, ease: [0.25, 1, 0.5, 1] }}
        />
        {!reduce && (
          <motion.span
            aria-hidden
            className="absolute top-[25px] hidden size-[5px] rounded-full bg-cyan-bright shadow-[0_0_12px_2px_rgba(36,200,216,0.7)] md:block"
            initial={{ left: "10%" }}
            animate={{ left: ["10%", `${10 + (active / (stages.length - 1)) * 80}%`] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
          />
        )}

        <div role="tablist" aria-label="DropTraQ data pipeline stages" className="relative grid grid-cols-5 gap-2">
          {stages.map((st, i) => {
            const Icon = st.icon;
            const on = i === active;
            const done = i < active;
            return (
              <button
                key={st.key}
                ref={(el) => { tabs.current[i] = el; }}
                role="tab"
                id={`stage-tab-${st.key}`}
                aria-selected={on}
                aria-controls={`stage-panel-${st.key}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className="group flex flex-col items-center gap-3 rounded-xl py-1 text-center"
              >
                <span
                  className={cn(
                    "relative inline-flex size-11 sm:size-14 items-center justify-center rounded-2xl border transition-all duration-300",
                    on ? "border-cyan bg-cyan/15 text-cyan glow-cyan" : done ? "border-cyan/40 bg-ink-800 text-cyan/80" : "border-line-strong bg-ink-850 text-muted group-hover:text-fg",
                  )}
                >
                  <Icon className="size-5 sm:size-6" aria-hidden />
                </span>
                <span className="font-mono text-[10px] text-subtle">0{i + 1}</span>
                <span className={cn("font-display text-[0.62rem] font-medium uppercase tracking-[0.04em] sm:text-sm sm:tracking-[0.12em]", on ? "text-fg" : "text-muted")}>
                  {st.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-ink-850/70">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={s.key}
            role="tabpanel"
            id={`stage-panel-${s.key}`}
            aria-labelledby={`stage-tab-${s.key}`}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
            className="grid gap-8 p-6 sm:p-10 lg:grid-cols-12"
          >
            <div className="lg:col-span-7">
              <p className="eyebrow">Stage 0{active + 1} · {s.label}</p>
              <h3 className="mt-4 font-display text-2xl font-medium leading-snug text-fg sm:text-3xl">{s.summary}</h3>
              <p className="mt-5 max-w-2xl leading-relaxed text-muted">{s.detail}</p>
              <div className="mt-8 flex gap-2">
                <button type="button" onClick={() => setActive((a) => Math.max(0, a - 1))} disabled={active === 0}
                  className="min-h-10 rounded-full border border-line-strong px-4 text-sm text-muted transition-colors hover:text-fg disabled:opacity-40">
                  ← Previous
                </button>
                <button type="button" onClick={() => setActive((a) => Math.min(stages.length - 1, a + 1))} disabled={active === stages.length - 1}
                  className="min-h-10 rounded-full border border-cyan/50 px-4 text-sm text-fg transition-colors hover:bg-cyan hover:text-white disabled:opacity-40">
                  Next stage →
                </button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="h-full rounded-xl border border-line bg-ink-950/80">
                <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-subtle">{s.artifactTitle}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-amber">example</span>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-cyan-soft/90">{s.artifact}</pre>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
