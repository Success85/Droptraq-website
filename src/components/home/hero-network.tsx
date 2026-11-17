"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";
import { SimLabel } from "@/components/ui/sim-label";
import { cn } from "@/lib/cn";
import { mulberry32 } from "@/lib/simulation";

/* Geometry of an illustrative distribution zone (not a real network). */
const pipes = [
  { id: "p0", d: "M70 250 H190" },
  { id: "p1", d: "M222 250 H300" },
  { id: "p2", d: "M300 250 V140 H404" },
  { id: "p3", d: "M300 250 V360 H404", loss: true },
  { id: "p4", d: "M436 140 H540 V84 H612" },
  { id: "p5", d: "M436 140 H540 V200 H612" },
  { id: "p6", d: "M436 360 H540 V306 H612" },
  { id: "p7", d: "M436 360 H540 V420 H612" },
];

type Node = { id: string; x: number; y: number; label: string; base: number };
const nodes: Node[] = [
  { id: "N-01", x: 246, y: 250, label: "Reservoir R1 outlet", base: 62 },
  { id: "N-02", x: 330, y: 140, label: "Main → R2 (sent)", base: 31 },
  { id: "N-03", x: 384, y: 140, label: "Reservoir R2 inlet", base: 30.6 },
  { id: "N-04", x: 330, y: 360, label: "Main → Zone B (sent)", base: 31 },
  { id: "N-05", x: 384, y: 360, label: "Zone B inlet", base: 26.7 },
  { id: "N-06", x: 590, y: 84, label: "District A feed", base: 14.8 },
  { id: "N-07", x: 590, y: 200, label: "Kiosk feed", base: 15.2 },
  { id: "N-08", x: 590, y: 306, label: "District B feed", base: 13.1 },
  { id: "N-09", x: 590, y: 420, label: "District C feed", base: 13.4 },
];
const HUB = { x: 178, y: 446 };

const dataPath = (n: Node) => {
  const cx = (n.x + HUB.x) / 2 - 30;
  const cy = Math.max(n.y, HUB.y) + 10;
  return `M${n.x} ${n.y} Q${cx} ${cy} ${HUB.x} ${HUB.y}`;
};

function Reservoir({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect x={x - 16} y={y - 20} width={32} height={40} rx={4} className="fill-ink-800 stroke-line-strong" strokeWidth={1.2} />
      <rect x={x - 13} y={y - 4} width={26} height={21} rx={2} className="fill-water/30" />
      <text x={x} y={y - 28} textAnchor="middle" className="fill-subtle font-mono text-[9px] tracking-wider">{label}</text>
    </g>
  );
}

export function HeroNetwork() {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);
  const [selected, setSelected] = useState<string>("N-05");
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1400);
    return () => window.clearInterval(id);
  }, [reduce]);

  // Auto-cycle the readout until the visitor picks a node.
  const active = pinned ? selected : nodes[(tick >> 1) % nodes.length].id;

  const readings = useMemo(() => {
    const r = mulberry32(1000 + tick);
    return Object.fromEntries(nodes.map((n) => [n.id, +(n.base * (1 + (r() - 0.5) * 0.06)).toFixed(1)]));
  }, [tick]);

  const node = nodes.find((n) => n.id === active)!;
  const sent = readings["N-04"];
  const received = readings["N-05"];
  const imbalance = ((sent - received) / sent) * 100;

  const choose = (id: string) => { setSelected(id); setPinned(true); };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-850/80 shadow-[0_30px_80px_-30px_rgba(11,29,43,0.18)] backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-cyan" />
            <span className="relative inline-flex size-2 rounded-full bg-cyan" />
          </span>
          Network view · demo zone
        </div>
        <SimLabel>Simulated visualization</SimLabel>
      </div>

      <svg viewBox="0 0 660 480" className="block h-auto w-full" role="img" aria-labelledby="hero-net-title hero-net-desc">
        <title id="hero-net-title">Illustrative connected water distribution network</title>
        <desc id="hero-net-desc">
          Water flows from a source through reservoirs and junctions to districts. Measurement nodes at both ends of each
          pipe section send readings to a zone gateway and monitoring interface. One section shows a simulated imbalance.
        </desc>
        <defs>
          <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#12a7ba" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#12a7ba" stopOpacity="0" />
          </radialGradient>
          <pattern id="minor-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="#e2e9f0" strokeWidth="0.5" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="660" height="480" fill="url(#minor-grid)" />

        {/* telemetry links */}
        <g fill="none">
          {nodes.map((n) => (
            <path key={n.id} d={dataPath(n)} stroke="#12a7ba" strokeOpacity={n.id === active ? 0.6 : 0.16}
              strokeWidth={n.id === active ? 1.2 : 0.8} strokeDasharray="2 4" className="transition-[stroke-opacity] duration-500" />
          ))}
        </g>

        {/* pipes: dim casing + moving water */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {pipes.map((p) => (
            <g key={p.id}>
              <path d={p.d} stroke="#d6e2eb" strokeWidth={9} />
              <path d={p.d} stroke={p.loss ? "#c97c0e" : "#2589d8"} strokeOpacity={p.loss ? 0.9 : 0.75} strokeWidth={2.4}
                strokeDasharray="6 6" className={reduce ? "" : "animate-dash"} />
            </g>
          ))}
        </g>

        {/* source */}
        <g>
          <rect x={22} y={226} width={48} height={48} rx={6} className="fill-ink-800 stroke-line-strong" strokeWidth={1.2} />
          <path d="M34 262 v-14 l12 -8 l12 8 v14" fill="none" stroke="#8396a5" strokeWidth={1.2} />
          <text x={46} y={292} textAnchor="middle" className="fill-subtle font-mono text-[9px] tracking-wider">SOURCE</text>
        </g>
        <Reservoir x={206} y={250} label="R1" />
        <Reservoir x={420} y={140} label="R2" />
        <g>
          <rect x={404} y={344} width={32} height={32} rx={4} className="fill-ink-800 stroke-line-strong" strokeWidth={1.2} />
          <text x={420} y={364} textAnchor="middle" className="fill-muted font-mono text-[9px]">B</text>
          <text x={420} y={394} textAnchor="middle" className="fill-subtle font-mono text-[9px] tracking-wider">ZONE B</text>
        </g>
        <circle cx={300} cy={250} r={5} className="fill-ink-700 stroke-line-strong" />

        {/* end-users */}
        {[84, 200, 306, 420].map((y) => (
          <g key={y} className="fill-ink-700 stroke-line-strong" strokeWidth={1}>
            <rect x={616} y={y - 11} width={9} height={9} rx={1.5} />
            <rect x={629} y={y - 11} width={9} height={9} rx={1.5} />
            <rect x={616} y={y + 2} width={9} height={9} rx={1.5} />
            <rect x={629} y={y + 2} width={9} height={9} rx={1.5} />
          </g>
        ))}

        {/* imbalance callout */}
        <g>
          <rect x={318} y={384} width={84} height={36} rx={5} className="fill-ink-900 stroke-amber/60" strokeWidth={1} />
          <text x={326} y={399} className="fill-amber font-mono text-[8.5px] tracking-wider">IMBALANCE</text>
          <text x={326} y={413} className="fill-fg font-mono text-[10px]">Δ {imbalance.toFixed(1)}%</text>
        </g>

        {/* hub + monitoring interface */}
        <circle cx={HUB.x} cy={HUB.y} r={36} fill="url(#hub-glow)" />
        <g>
          <rect x={HUB.x - 20} y={HUB.y - 13} width={40} height={26} rx={5} className="fill-ink-800 stroke-cyan" strokeWidth={1.2} />
          <path d={`M${HUB.x - 10} ${HUB.y} h20 M${HUB.x - 10} ${HUB.y - 5} h14 M${HUB.x - 10} ${HUB.y + 5} h8`} stroke="#12a7ba" strokeWidth={1.2} />
          <text x={HUB.x} y={HUB.y + 28} textAnchor="middle" className="fill-cyan font-mono text-[9px] tracking-wider">GATEWAY</text>
        </g>
        <path d={`M${HUB.x - 20} ${HUB.y} H96`} stroke="#12a7ba" strokeOpacity={0.5} strokeDasharray="3 3" />
        <g>
          <rect x={30} y={420} width={66} height={46} rx={5} className="fill-ink-800 stroke-line-strong" strokeWidth={1.2} />
          <path d="M38 452 l10 -10 l8 6 l12 -14 l14 9" fill="none" stroke="#12a7ba" strokeWidth={1.4} />
          <text x={63} y={479} textAnchor="middle" className="fill-subtle font-mono text-[9px] tracking-wider">DASHBOARD</text>
        </g>

        {/* packets travelling to the gateway */}
        {!reduce && nodes.map((n, i) => (
          <circle key={`pk-${n.id}`} r={2.4} fill="#0a8394">
            <animateMotion dur={`${2.6 + (i % 3) * 0.5}s`} begin={`${(i * 0.37).toFixed(2)}s`} repeatCount="indefinite" path={dataPath(n)} />
          </circle>
        ))}

        {/* measurement nodes */}
        {nodes.map((n) => {
          const on = n.id === active;
          const loss = n.id === "N-04" || n.id === "N-05";
          return (
            <g
              key={n.id}
              role="button"
              tabIndex={0}
              aria-label={`${n.id}, ${n.label}: ${readings[n.id]} litres per minute (simulated)`}
              aria-pressed={on}
              onClick={() => choose(n.id)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(n.id); } }}
              onMouseEnter={() => choose(n.id)}
              className="cursor-pointer outline-none [&:focus-visible>circle:last-child]:stroke-fg"
            >
              <circle cx={n.x} cy={n.y} r={14} fill="transparent" />
              {!reduce && <circle cx={n.x} cy={n.y} r={7} className={cn("origin-center animate-pulse-ring", loss ? "fill-amber/50" : "fill-cyan/50")} style={{ transformBox: "fill-box" }} />}
              <circle cx={n.x} cy={n.y} r={on ? 7 : 5.5} className={cn("transition-all duration-300", loss ? "fill-amber" : "fill-cyan", on && "stroke-fg")} stroke="transparent" strokeWidth={2} />
            </g>
          );
        })}
      </svg>

      <div className="grid grid-cols-2 border-t border-line font-mono text-[11px] sm:grid-cols-3">
        <div className="col-span-2 border-b border-line px-4 py-3 sm:col-span-1 sm:border-b-0 sm:border-r">
          <p className="uppercase tracking-wider text-subtle">Selected node</p>
          <p className="mt-1 truncate text-fg"><span className="text-cyan">{node.id}</span> · {node.label}</p>
        </div>
        <div className="border-r border-line px-4 py-3">
          <p className="uppercase tracking-wider text-subtle">Flow (sim)</p>
          <p className="mt-1 text-base text-fg tabular-nums">{readings[node.id]} <span className="text-xs text-muted">L/min</span></p>
        </div>
        <div className="px-4 py-3">
          <p className="uppercase tracking-wider text-subtle">Zone B balance</p>
          <p className="mt-1 text-base tabular-nums text-amber">−{imbalance.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}
