"use client";

import {
  CartesianGrid, Line, LineChart, ReferenceDot, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import type { FlowPoint } from "@/lib/simulation";
import { useMounted } from "@/hooks/use-mounted";

/*
 * Series colors carry identity only; text always uses ink tokens.
 * Validated with the dataviz palette checker against the white (#ffffff)
 * surface: lightness band, chroma, CVD and normal-vision separation, contrast.
 * "Received" is also dashed, as a non-color cue.
 */
export const SERIES = {
  inflow: { color: "#009eb2", label: "Sent (upstream)" },
  outflow: { color: "#7c4ddb", label: "Received (downstream)" },
};

type TipProps = { active?: boolean; label?: string; payload?: { payload: FlowPoint }[] };

function ChartTooltip({ active, payload, label }: TipProps) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  const gap = ((p.inflow - p.outflow) / p.inflow) * 100;
  return (
    <div className="min-w-48 rounded-lg border border-line-strong bg-ink-850 p-3 font-mono text-[11px] text-fg shadow-xl">
      <p className="mb-2 text-subtle">{label}</p>
      <p className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-2"><span className="h-0.5 w-3 rounded" style={{ background: SERIES.inflow.color }} />Sent</span>
        <span className="tabular-nums">{p.inflow} m³/h</span>
      </p>
      <p className="mt-1 flex items-center justify-between gap-4">
        <span className="flex items-center gap-2"><span className="h-0.5 w-3 rounded border-t border-dashed" style={{ borderColor: SERIES.outflow.color }} />Received</span>
        <span className="tabular-nums">{p.outflow} m³/h</span>
      </p>
      <p className="mt-2 flex justify-between border-t border-line pt-2 text-muted">
        <span>Gap</span><span className="tabular-nums text-fg">{gap.toFixed(1)}%</span>
      </p>
      {p.anomaly && <p className="mt-2 text-amber">▲ Night-flow anomaly</p>}
    </div>
  );
}

export function DashboardChart({ data }: { data: FlowPoint[] }) {
  const mounted = useMounted();
  if (!mounted) return <div className="h-full w-full animate-pulse rounded-lg bg-ink-800/40" />;
  const anomalies = data.filter((d) => d.anomaly);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 12, bottom: 0, left: -12 }}>
        <CartesianGrid stroke="#e2e9f0" strokeOpacity={0.7} vertical={false} />
        <XAxis dataKey="t" tick={{ fill: "#66798a", fontSize: 10, fontFamily: "var(--font-mono)" }} tickLine={false}
          axisLine={{ stroke: "#b8c8d5" }} interval="preserveStartEnd" minTickGap={36} />
        <YAxis tick={{ fill: "#66798a", fontSize: 10, fontFamily: "var(--font-mono)" }} tickLine={false} axisLine={false} width={44}
          unit="" domain={[0, "auto"]} />
        <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#8396a5", strokeOpacity: 0.4, strokeWidth: 1 }} />
        <Line type="monotone" dataKey="inflow" stroke={SERIES.inflow.color} strokeWidth={2} dot={false}
          activeDot={{ r: 4, stroke: "#ffffff", strokeWidth: 2 }} isAnimationActive={false} />
        <Line type="monotone" dataKey="outflow" stroke={SERIES.outflow.color} strokeWidth={2} strokeDasharray="5 4" dot={false}
          activeDot={{ r: 4, stroke: "#ffffff", strokeWidth: 2 }} isAnimationActive={false} />
        {anomalies.map((a) => (
          <ReferenceDot key={a.t} x={a.t} y={a.outflow} r={4.5} fill="#c97c0e" stroke="#ffffff" strokeWidth={2} ifOverflow="visible" />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
