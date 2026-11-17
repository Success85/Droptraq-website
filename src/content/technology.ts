/**
 * Technology content. Every capability carries an explicit status so the
 * site never presents a planned feature as a deployed one.
 *
 *  prototyped  – demonstrated in a working prototype or simulation
 *  development – actively being built (hardware bench build, integration)
 *  planned     – part of the product direction, not yet built
 */
export type Status = "prototyped" | "development" | "planned";

export const statusMeta: Record<Status, { label: string; description: string }> = {
  prototyped: { label: "Prototyped", description: "Demonstrated in a working prototype or simulation." },
  development: { label: "In development", description: "Actively being built and integrated." },
  planned: { label: "Planned", description: "Part of our product direction. Not yet built." },
};

export type ArchitectureLayer = {
  id: string;
  name: string;
  short: string;
  status: Status;
  purpose: string;
  details: string[];
  tech: string[];
};

export const architecture: ArchitectureLayer[] = [
  {
    id: "sensor",
    name: "Flow Sensor",
    short: "Measure",
    status: "prototyped",
    purpose: "Converts physical water movement into an electrical signal that can be counted and measured.",
    details: [
      "Hall-effect flow sensors emit pulses proportional to flow; pulse counts become flow rate and cumulative volume.",
      "Precision flow meters, water-level (ultrasonic) and turbidity sensing are being evaluated for different measurement points.",
      "Measurement points are placed at both ends of a pipe section so inflow and outflow can be compared.",
    ],
    tech: ["Pulse flow sensors", "Precision flow meters", "Ultrasonic level", "Turbidity"],
  },
  {
    id: "controller",
    name: "Embedded Controller",
    short: "Connect",
    status: "prototyped",
    purpose: "Reads sensors at the edge, timestamps measurements and prepares them for transmission.",
    details: [
      "ESP32 firmware reads the flow sensor, computes flow rate (L/min) and total volume, and packages readings as structured messages. Validated in simulation.",
      "A physical edge-node bench build, with real-time clock and local storage for buffering during outages, is in progress.",
      "Power options for remote sites, including battery and small solar or micro-hydro harvesting, are being explored.",
    ],
    tech: ["ESP32", "C/C++ firmware", "RTC", "Local buffering"],
  },
  {
    id: "comms",
    name: "Communication Layer",
    short: "Transmit",
    status: "prototyped",
    purpose: "Moves measurements reliably from field devices to the platform.",
    details: [
      "Readings are published over MQTT, a lightweight publish/subscribe protocol designed for constrained devices. Demonstrated end to end in the prototype.",
      "Wi-Fi is used for prototyping. Cellular (GSM/GPRS) and low-power mesh radio options are being evaluated for field conditions.",
    ],
    tech: ["MQTT", "Wi-Fi", "GSM/GPRS (evaluating)", "Mesh radio (evaluating)"],
  },
  {
    id: "processing",
    name: "Data Processing",
    short: "Process",
    status: "development",
    purpose: "Receives telemetry, validates it and turns raw readings into comparable network measurements.",
    details: [
      "Ingests device messages, checks them for completeness and aligns readings by time.",
      "Computes segment balances, the difference between water sent and water received across a pipe section.",
      "A local gateway (single-board Linux computer) is being developed to aggregate nodes within a zone.",
    ],
    tech: ["Message ingestion", "Validation", "Segment balancing", "Edge gateway"],
  },
  {
    id: "database",
    name: "Database",
    short: "Store",
    status: "development",
    purpose: "Keeps a durable, queryable history of every measurement.",
    details: [
      "Time-series storage of flow, volume and device health.",
      "Historical records support trend analysis, reporting and later model training.",
    ],
    tech: ["Time-series storage", "Device registry", "Audit history"],
  },
  {
    id: "dashboard",
    name: "Monitoring Dashboard",
    short: "Visualize",
    status: "prototyped",
    purpose: "Gives operators one view of flow, device status and alerts.",
    details: [
      "The prototype dashboard connects to the MQTT stream and shows live flow rate, total volume, flow history and recent messages.",
      "Threshold alerts flag flow above a configurable limit (prototyped).",
      "Zone overviews, segment-loss tables and reporting are in development.",
    ],
    tech: ["Web dashboard", "Live MQTT stream", "Threshold alerts", "Charts"],
  },
  {
    id: "insights",
    name: "Operational Insights",
    short: "Act",
    status: "planned",
    purpose: "Helps operators decide where to investigate and what to do next.",
    details: [
      "Locating likely losses to a specific pipe section by comparing sent and received volumes.",
      "Anomaly detection on flow patterns (for example, unusual night-time flow).",
      "Notifications to field teams and, over time, predictive intelligence.",
    ],
    tech: ["Loss localisation", "Anomaly detection", "Notifications", "Predictive models"],
  },
];

export const roadmap: { phase: string; title: string; status: Status; items: string[] }[] = [
  {
    phase: "Phase 01",
    title: "Prove the data path",
    status: "prototyped",
    items: [
      "ESP32 firmware reading a pulse flow sensor (simulation)",
      "Flow rate and volume published over MQTT",
      "Prototype dashboard with live flow, history and threshold alert",
    ],
  },
  {
    phase: "Phase 02",
    title: "Physical edge node",
    status: "development",
    items: [
      "Bench build of the sensor node with real flow sensors",
      "Timekeeping and local buffering for unreliable connectivity",
      "Field-ready power and enclosure design",
    ],
  },
  {
    phase: "Phase 03",
    title: "Zone gateway & segment balance",
    status: "development",
    items: [
      "Local gateway aggregating multiple nodes",
      "Sent vs. received balance for each pipe section",
      "Persistent time-series history",
    ],
  },
  {
    phase: "Phase 04",
    title: "Pilot readiness",
    status: "planned",
    items: [
      "Controlled pilot on a test network section",
      "Cellular connectivity for sites without Wi-Fi",
      "Operator workflows, reporting and alert routing",
    ],
  },
  {
    phase: "Phase 05",
    title: "Intelligence layer",
    status: "planned",
    items: [
      "Anomaly detection on flow patterns",
      "Loss localisation and prioritisation",
      "Predictive maintenance signals",
    ],
  },
];

export const disciplines = [
  {
    id: "iot",
    title: "IoT & Embedded Systems",
    body: "Firmware for ESP32-class microcontrollers that samples sensors, timestamps readings and handles connectivity.",
    tags: ["ESP32", "C/C++", "Low-power design"],
  },
  {
    id: "hardware",
    title: "Sensors & Hardware",
    body: "Flow, level and water-quality sensing, interface electronics and power design for field conditions.",
    tags: ["Flow sensors", "Signal conditioning", "Power"],
  },
  {
    id: "protocols",
    title: "Communication Protocols",
    body: "MQTT publish/subscribe telemetry, with cellular and mesh radio options evaluated for coverage gaps.",
    tags: ["MQTT", "Wi-Fi", "GSM/GPRS"],
  },
  {
    id: "backend",
    title: "Backend Infrastructure",
    body: "Message ingestion, validation and durable storage designed around time-series telemetry.",
    tags: ["Ingestion", "Time-series", "Edge gateway"],
  },
  {
    id: "analytics",
    title: "Data Analytics",
    body: "Segment balancing today. Anomaly detection and predictive models are on the roadmap.",
    tags: ["Balancing", "Anomalies", "Forecasting"],
  },
  {
    id: "visualization",
    title: "Monitoring & Visualization",
    body: "Operator dashboards that make network state, device health and alerts legible at a glance.",
    tags: ["Dashboards", "Alerts", "Reporting"],
  },
] as const;
