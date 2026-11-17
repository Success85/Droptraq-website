/**
 * Deterministic, clearly simulated data for illustrative visualizations.
 * Seeded so server and client render identical values (no hydration drift).
 * NONE of this is real DropTraQ or utility data.
 */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Range = "24h" | "7d" | "30d";

export type FlowPoint = { t: string; inflow: number; outflow: number; anomaly?: boolean };

/** Diurnal demand curve: low overnight, morning and evening peaks. */
function demand(hour: number) {
  const morning = Math.exp(-((hour - 7) ** 2) / 4);
  const evening = Math.exp(-((hour - 19) ** 2) / 5);
  return 0.28 + 0.62 * morning + 0.5 * evening;
}

export function flowSeries(range: Range, seed = 7): FlowPoint[] {
  const rand = mulberry32(seed + (range === "24h" ? 1 : range === "7d" ? 2 : 3));
  const points = range === "24h" ? 48 : range === "7d" ? 56 : 60;
  const hoursPerStep = range === "24h" ? 0.5 : range === "7d" ? 3 : 12;
  const out: FlowPoint[] = [];
  for (let i = 0; i < points; i++) {
    const h = (i * hoursPerStep) % 24;
    const base = 120 * demand(h) * (range === "30d" ? 1 : 1);
    const noise = (rand() - 0.5) * 8;
    const inflow = Math.max(18, base + noise);
    // simulated gap opening up late in the window, with a night-flow anomaly
    const lateGap = i > points * 0.62 ? 0.16 : 0.035;
    const nightLeak = (h < 4 || h > 23) && i > points * 0.62;
    const outflow = inflow * (1 - lateGap - rand() * 0.02);
    let label: string;
    if (range === "24h") label = `${String(Math.floor(h)).padStart(2, "0")}:${h % 1 ? "30" : "00"}`;
    else if (range === "7d") label = `D${Math.floor((i * hoursPerStep) / 24) + 1} ${String(Math.floor(h)).padStart(2, "0")}h`;
    else label = `Day ${Math.floor((i * hoursPerStep) / 24) + 1}`;
    out.push({ t: label, inflow: +inflow.toFixed(1), outflow: +outflow.toFixed(1), anomaly: nightLeak || undefined });
  }
  return out;
}

export type Segment = { id: string; from: string; to: string; sent: number; received: number };

export const simulatedSegments: Segment[] = [
  { id: "S-01", from: "Reservoir R1", to: "Junction J2", sent: 1240, received: 1222 },
  { id: "S-02", from: "Junction J2", to: "Reservoir R3", sent: 640, received: 548 },
  { id: "S-03", from: "Junction J2", to: "Zone B inlet", sent: 580, received: 571 },
  { id: "S-04", from: "Reservoir R3", to: "Kiosk K4", sent: 312, received: 301 },
  { id: "S-05", from: "Zone B inlet", to: "Zone B mains", sent: 568, received: 489 },
];

export const lossPct = (s: Segment) => ((s.sent - s.received) / s.sent) * 100;
export const segmentStatus = (s: Segment): "ok" | "watch" | "alert" => {
  const p = lossPct(s);
  return p >= 10 ? "alert" : p >= 3 ? "watch" : "ok";
};

export type DeviceNode = { id: string; label: string; kind: "flow" | "level" | "gateway"; link: "online" | "degraded" | "offline"; lastSeen: string; battery?: number };

export const simulatedNodes: DeviceNode[] = [
  { id: "N-101", label: "R1 outlet", kind: "flow", link: "online", lastSeen: "12 s", battery: 92 },
  { id: "N-102", label: "J2 inlet", kind: "flow", link: "online", lastSeen: "9 s", battery: 88 },
  { id: "N-103", label: "R3 inlet", kind: "flow", link: "online", lastSeen: "14 s", battery: 71 },
  { id: "N-104", label: "R3 level", kind: "level", link: "degraded", lastSeen: "3 min", battery: 34 },
  { id: "N-105", label: "Zone B inlet", kind: "flow", link: "online", lastSeen: "6 s", battery: 95 },
  { id: "N-106", label: "Kiosk K4", kind: "flow", link: "offline", lastSeen: "41 min", battery: 8 },
  { id: "G-001", label: "Zone gateway", kind: "gateway", link: "online", lastSeen: "2 s" },
];
