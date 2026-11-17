"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle, BatteryLow, Check, CheckCircle2, CircleDot, LayoutGrid, Network, Radio, Siren, Table2, WifiOff,
} from "lucide-react";
import { DashboardChart, SERIES } from "./dashboard-chart";
import {
  flowSeries, lossPct, segmentStatus, simulatedNodes, simulatedSegments, type Range,
} from "@/lib/simulation";
import { cn } from "@/lib/cn";

type Tab = "overview" | "segments" | "devices" | "alerts";
const tabs: { id: Tab; label: string; icon: typeof LayoutGrid }[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "segments", label: "Segments", icon: Table2 },
  { id: "devices", label: "Devices", icon: Radio },
  { id: "alerts", label: "Alerts", icon: Siren },
];

const statusUi = {
  ok: { label: "Normal", icon: CheckCircle2, cls: "text-ok border-ok/30 bg-ok/10" },
  watch: { label: "Watch", icon: CircleDot, cls: "text-amber border-amber/30 bg-amber/10" },
  alert: { label: "Investigate", icon: AlertTriangle, cls: "text-alert border-alert/35 bg-alert/10" },
};
const linkUi = {
  online: { label: "Online", cls: "text-ok", icon: Radio },
  degraded: { label: "Degraded", cls: "text-amber", icon: BatteryLow },
  offline: { label: "Offline", cls: "text-alert", icon: WifiOff },
};

const initialAlerts = [
  { id: "A-311", sev: "alert" as const, title: "Sustained imbalance on S-05", meta: "Zone B inlet → Zone B mains · −13.9%", time: "02:10" },
  { id: "A-309", sev: "alert" as const, title: "Imbalance on S-02", meta: "Junction J2 → Reservoir R3 · −14.4%", time: "01:52" },
  { id: "A-305", sev: "watch" as const, title: "Node N-106 offline", meta: "Kiosk K4 · last message 41 min ago", time: "00:58" },
  { id: "A-301", sev: "watch" as const, title: "Low battery on N-104", meta: "R3 level sensor · 34%", time: "Yesterday" },
];

function StatusPill({ s }: { s: keyof typeof statusUi }) {
  const u = statusUi[s];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-wide", u.cls)}>
      <u.icon aria-hidden className="size-3" />{u.label}
    </span>
  );
}

export function DashboardPreview() {
  const [tab, setTab] = useState<Tab>("overview");
  const [range, setRange] = useState<Range>("24h");
  const [acked, setAcked] = useState<string[]>([]);
  const data = useMemo(() => flowSeries(range), [range]);

  const totals = useMemo(() => {
    const hours = range === "24h" ? 0.5 : range === "7d" ? 3 : 12;
    const sent = data.reduce((a, d) => a + d.inflow * hours, 0);
    const recv = data.reduce((a, d) => a + d.outflow * hours, 0);
    return { sent, recv, gap: ((sent - recv) / sent) * 100 };
  }, [data, range]);

  const online = simulatedNodes.filter((n) => n.link === "online").length;
  const openAlerts = initialAlerts.filter((a) => !acked.includes(a.id)).length;
  const fmt = (n: number) => (n >= 10000 ? `${(n / 1000).toFixed(1)}k` : Math.round(n).toLocaleString("en-US"));

  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-ink-850 shadow-[0_40px_120px_-40px_rgba(36,200,216,0.25)]">
      {/* window chrome */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-ink-900 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-ink-600" /><span className="size-2.5 rounded-full bg-ink-600" /><span className="size-2.5 rounded-full bg-ink-600" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">DropTraQ Monitor · Demo zone</span>
        </div>
        <span className="rounded-md border border-amber/30 bg-amber/10 px-2 py-1 font-mono text-[10.5px] uppercase tracking-wider text-amber">
          Illustrative product interface — development preview
        </span>
      </div>

      <div className="grid md:grid-cols-[180px_1fr]">
        {/* nav */}
        <nav aria-label="Dashboard preview sections" className="border-b border-line bg-ink-900/60 p-2 md:border-b-0 md:border-r md:p-3">
          <ul role="tablist" aria-orientation="vertical" className="grid grid-cols-4 gap-1 md:grid-cols-1">
            {tabs.map((t) => (
              <li key={t.id} role="presentation">
                <button
                  role="tab"
                  aria-selected={tab === t.id}
                  aria-controls="dash-panel"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "flex w-full min-h-10 flex-col items-center gap-1 rounded-lg px-2 py-2 text-[11px] transition-colors sm:text-xs md:flex-row md:gap-2.5 md:px-3 md:text-sm",
                    tab === t.id ? "bg-cyan/10 text-fg ring-1 ring-cyan/30" : "text-muted hover:bg-ink-800 hover:text-fg",
                  )}
                >
                  <t.icon aria-hidden className={cn("size-4", tab === t.id && "text-cyan")} />
                  {t.label}
                  {t.id === "alerts" && openAlerts > 0 && (
                    <span className="rounded-full bg-alert/20 px-1.5 font-mono text-[10px] text-alert md:ml-auto">{openAlerts}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 hidden rounded-lg border border-line p-3 md:block">
            <p className="font-mono text-[10px] uppercase tracking-wider text-subtle">Gateway</p>
            <p className="mt-1.5 flex items-center gap-2 text-sm text-fg"><span className="size-1.5 animate-blink rounded-full bg-ok" />Connected</p>
            <p className="mt-1 font-mono text-[10px] text-subtle">MQTT · last msg 2 s</p>
          </div>
        </nav>

        <div id="dash-panel" role="tabpanel" className="min-w-0 p-4 sm:p-6">
          {tab === "overview" && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg text-fg">Flow monitoring</h3>
                  <p className="text-xs text-subtle">Zone B inlet segment · sent vs. received</p>
                </div>
                <div role="group" aria-label="Time range" className="inline-flex rounded-lg border border-line p-0.5">
                  {(["24h", "7d", "30d"] as Range[]).map((r) => (
                    <button key={r} onClick={() => setRange(r)} aria-pressed={range === r}
                      className={cn("min-h-8 rounded-md px-3 font-mono text-xs transition-colors", range === r ? "bg-ink-700 text-fg" : "text-muted hover:text-fg")}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4">
                {[
                  ["Volume sent", `${fmt(totals.sent)} m³`, null],
                  ["Volume received", `${fmt(totals.recv)} m³`, null],
                  ["Segment balance", `−${totals.gap.toFixed(1)}%`, "warn"],
                  ["Nodes online", `${online} / ${simulatedNodes.length}`, null],
                ].map(([k, v, tone]) => (
                  <div key={k} className="bg-ink-900 px-4 py-3">
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-subtle">{k}</dt>
                    <dd className={cn("mt-1 font-display text-xl tabular-nums sm:text-2xl", tone ? "text-amber" : "text-fg")}>{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 rounded-xl border border-line bg-ink-900/60 p-3 sm:p-4">
                <div className="mb-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted">
                  <span className="flex items-center gap-2"><span className="h-0.5 w-4 rounded" style={{ background: SERIES.inflow.color }} />{SERIES.inflow.label}</span>
                  <span className="flex items-center gap-2"><span className="w-4 border-t-2 border-dashed" style={{ borderColor: SERIES.outflow.color }} />{SERIES.outflow.label}</span>
                  <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-amber" />Anomaly</span>
                  <span className="ml-auto font-mono text-[10px] text-subtle">m³/h</span>
                </div>
                <div className="h-56 sm:h-64">
                  <DashboardChart data={data} />
                </div>
              </div>
              <p className="mt-3 text-xs text-subtle">
                The widening gap late in the window illustrates how a developing loss would appear. Hover the chart for values.
              </p>
            </div>
          )}

          {tab === "segments" && (
            <div>
              <h3 className="font-display text-lg text-fg">Network overview · segment balance</h3>
              <p className="text-xs text-subtle">Each segment compares the meter at its upstream end with the meter at its downstream end.</p>
              <div className="mt-5 overflow-x-auto rounded-xl border border-line">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead className="bg-ink-900 font-mono text-[10.5px] uppercase tracking-wider text-subtle">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-normal">Segment</th>
                      <th scope="col" className="px-4 py-3 text-right font-normal">Sent m³</th>
                      <th scope="col" className="px-4 py-3 text-right font-normal">Received m³</th>
                      <th scope="col" className="px-4 py-3 font-normal">Balance</th>
                      <th scope="col" className="px-4 py-3 font-normal">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {simulatedSegments.map((s) => {
                      const p = lossPct(s);
                      const st = segmentStatus(s);
                      return (
                        <tr key={s.id} className="transition-colors hover:bg-ink-900/70">
                          <td className="px-4 py-3">
                            <span className="font-mono text-xs text-cyan">{s.id}</span>
                            <span className="block text-xs text-muted">{s.from} → {s.to}</span>
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums text-fg">{s.sent.toLocaleString("en-US")}</td>
                          <td className="px-4 py-3 text-right tabular-nums text-fg">{s.received.toLocaleString("en-US")}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-20 overflow-hidden rounded-full bg-ink-800" aria-hidden>
                                <div className={cn("h-full rounded-full", st === "alert" ? "bg-alert" : st === "watch" ? "bg-amber" : "bg-ok")} style={{ width: `${Math.min(100, p * 5)}%` }} />
                              </div>
                              <span className="font-mono text-xs tabular-nums text-fg">−{p.toFixed(1)}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3"><StatusPill s={st} /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "devices" && (
            <div>
              <h3 className="font-display text-lg text-fg">Data transmission status</h3>
              <p className="text-xs text-subtle">Measurement points and gateway health.</p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {simulatedNodes.map((n) => {
                  const l = linkUi[n.link];
                  return (
                    <li key={n.id} className="flex items-center justify-between gap-3 rounded-xl border border-line bg-ink-900/70 px-4 py-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-ink-800 text-muted">
                          {n.kind === "gateway" ? <Network aria-hidden className="size-4" /> : <Radio aria-hidden className="size-4" />}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm text-fg"><span className="font-mono text-xs text-cyan">{n.id}</span> · {n.label}</p>
                          <p className="font-mono text-[10.5px] text-subtle">last msg {n.lastSeen}{n.battery !== undefined && ` · batt ${n.battery}%`}</p>
                        </div>
                      </div>
                      <span className={cn("inline-flex shrink-0 items-center gap-1 font-mono text-[10.5px] uppercase", l.cls)}>
                        <l.icon aria-hidden className="size-3.5" />{l.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {tab === "alerts" && (
            <div>
              <h3 className="font-display text-lg text-fg">Anomaly indicators</h3>
              <p className="text-xs text-subtle">Acknowledge an alert to move it out of the open queue.</p>
              <ul className="mt-5 space-y-2">
                {initialAlerts.map((a) => {
                  const done = acked.includes(a.id);
                  return (
                    <li key={a.id} className={cn("flex flex-col gap-3 rounded-xl border px-4 py-3 transition-colors sm:flex-row sm:items-center sm:justify-between",
                      done ? "border-line bg-ink-900/40 opacity-60" : a.sev === "alert" ? "border-alert/30 bg-alert/5" : "border-amber/25 bg-amber/5")}>
                      <div className="flex items-start gap-3">
                        {a.sev === "alert"
                          ? <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0 text-alert" />
                          : <CircleDot aria-hidden className="mt-0.5 size-4 shrink-0 text-amber" />}
                        <div>
                          <p className="text-sm text-fg">{a.title} <span className="sr-only">({a.sev === "alert" ? "investigate" : "watch"})</span></p>
                          <p className="font-mono text-[10.5px] text-subtle">{a.id} · {a.meta} · {a.time}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setAcked((x) => (done ? x.filter((i) => i !== a.id) : [...x, a.id]))}
                        className={cn("inline-flex min-h-9 shrink-0 items-center justify-center gap-1.5 rounded-full border px-3 text-xs transition-colors",
                          done ? "border-ok/40 text-ok" : "border-line-strong text-fg hover:border-cyan hover:text-cyan")}
                      >
                        {done ? <><Check aria-hidden className="size-3.5" />Acknowledged</> : "Acknowledge"}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
