/**
 * Insights / editorial content.
 *
 *  status "published"       – real, written by DropTraQ. Gets its own page.
 *  status "in-preparation"  – a working draft. Never shown on the site.
 *
 * To publish an article: write the body (paragraph strings), set a real
 * date, and set status to "published".
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
];

export const publishedInsights = () =>
  insights
    .filter((i) => i.status === "published")
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
