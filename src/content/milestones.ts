/**
 * Company milestones ("traction"). Only verified facts belong here.
 *
 * `date` is optional: leave it out rather than guess. Items are shown in the
 * order listed, so keep them chronological (oldest first).
 *
 * TODO(company): add the competition's name, organiser and date to the prize
 * milestone, and add any further verified milestones (programmes, grants,
 * pilots) with dates.
 */
export type Milestone = {
  title: string;
  detail: string;
  /** Display date, e.g. "16 Nov 2026" or "2026". Omit if not confirmed. */
  date?: string;
  kind: "build" | "research" | "funding" | "team";
  /** Emphasised as a headline figure in the timeline. */
  highlight?: string;
  href?: string;
};

export const milestones: Milestone[] = [
  {
    kind: "research",
    title: "Research meetings at WASAC",
    date: "8 Apr 2026",
    detail:
      "Our team met WASAC's operations leadership and its GIS / geospatial unit to understand the causes of non-revenue water and how the network is monitored today. A research engagement, not a partnership.",
  },
  {
    kind: "build",
    title: "End-to-end prototype data path",
    detail:
      "ESP32 firmware reads a flow sensor, computes flow rate and volume, and publishes readings over MQTT to a live dashboard with threshold alerts. Demonstrated in simulation.",
  },
  {
    kind: "research",
    title: "Field research at a water treatment plant",
    detail:
      "The team visited an operating water treatment plant to study intake, treatment, pumping and control-room operations first-hand, and to learn from the engineers who run them.",
  },
  {
    kind: "funding",
    title: "Won USD 2,500 in competition prize funding",
    highlight: "USD 2,500",
    detail: "DropTraQ won USD 2,500 in prize funding through a startup competition.",
  },
  {
    kind: "team",
    title: "Technical co-founder session",
    date: "16 Nov 2026",
    detail:
      "An in-person session at the African Leadership University campus for IoT, embedded-systems and hardware builders interested in joining DropTraQ.",
    href: "/insights/technical-co-founder-session-nov-2026",
  },
];
