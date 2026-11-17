/**
 * Insights / editorial content.
 *
 *  status "published"       – real, written by DropTraQ. Gets its own page.
 *  status "in-preparation"  – a planned topic. Shown as "In preparation";
 *                             no body text, no fake date, no fake author.
 *
 * To publish an article: write the body (paragraph strings), set a real
 * date and author, and change the status to "published".
 */
export const topics = [
  "IoT & Infrastructure",
  "Water Distribution",
  "Embedded Systems",
  "Smart Utilities",
  "Engineering Log",
  "Water Accountability",
  "African Infrastructure",
  "Company",
] as const;
export type Topic = (typeof topics)[number];

export type Insight = {
  slug: string;
  title: string;
  summary: string;
  topic: Topic;
  status: "published" | "in-preparation";
  /** ISO date, required when published. */
  date?: string;
  readingTime?: string;
  body?: string[];
};

export const insights: Insight[] = [
  {
    slug: "technical-co-founder-session-nov-2026",
    title: "Building DropTraQ: an open session for technical co-founders",
    summary:
      "We hosted an in-person session for IoT, embedded-systems, electronics and hardware-minded builders interested in joining DropTraQ as a technical co-founder.",
    topic: "Company",
    status: "published",
    date: "2026-11-16",
    readingTime: "2 min read",
    body: [
      "On Monday, 16 November 2026, DropTraQ held an in-person session at the African Leadership University campus for people interested in joining the company as a technical co-founder.",
      "DropTraQ is an IoT startup working on a real infrastructure problem: helping water operators see how water moves through distribution networks, flag abnormal losses and improve water accountability.",
      "The session was aimed at builders with backgrounds in IoT, embedded systems, electronics and hardware: people who want to build something meaningful, join an early-stage company, and work on technology with practical impact in Rwanda.",
      "If you missed the session and this describes you, we would still like to hear from you. Get in touch through our contact page and choose “Engineering talent”.",
    ],
  },
  {
    slug: "segment-balance-explained",
    title: "Why measure both ends of a pipe? Segment balance, explained",
    summary: "How comparing water sent with water received narrows a loss down to one section of the network.",
    topic: "Water Distribution",
    status: "in-preparation",
  },
  {
    slug: "pulse-flow-sensors-on-esp32",
    title: "From pulses to litres: reading flow sensors on ESP32",
    summary: "Engineering notes on sampling, calibration and timekeeping for low-cost flow measurement.",
    topic: "Embedded Systems",
    status: "in-preparation",
  },
  {
    slug: "mqtt-for-field-telemetry",
    title: "MQTT for field telemetry: lessons from our prototype",
    summary: "Why we chose publish/subscribe messaging for constrained devices and unreliable links.",
    topic: "IoT & Infrastructure",
    status: "in-preparation",
  },
  {
    slug: "what-is-non-revenue-water",
    title: "Non-revenue water: a primer for non-engineers",
    summary: "Real losses, apparent losses and unbilled consumption: what the terms mean and why they matter.",
    topic: "Water Accountability",
    status: "in-preparation",
  },
  {
    slug: "designing-for-intermittent-connectivity",
    title: "Designing infrastructure devices for intermittent connectivity",
    summary: "Buffering, timestamps and recovery: building devices that do not lose data when the network does.",
    topic: "African Infrastructure",
    status: "in-preparation",
  },
  {
    slug: "what-operators-need-from-a-dashboard",
    title: "What operators actually need from a monitoring dashboard",
    summary: "Notes on designing interfaces that support decisions rather than just display data.",
    topic: "Smart Utilities",
    status: "in-preparation",
  },
];

export const publishedInsights = () =>
  insights
    .filter((i) => i.status === "published")
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
