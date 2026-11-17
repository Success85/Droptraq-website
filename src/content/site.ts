/**
 * ─────────────────────────────────────────────────────────────────────────
 *  DropTraQ — central company configuration
 * ─────────────────────────────────────────────────────────────────────────
 *  Every piece of company information shown on the website lives here.
 *
 *  RULES
 *  • Only put VERIFIED information in this file.
 *  • A value of `null` means "not provided yet". The UI hides anything
 *    that is null, so placeholders never reach the public site.
 *  • Team members with `published: false` are hidden in production and
 *    shown as dashed "profile pending" cards in development only.
 *
 *  Still needed from the company — search this file for "TODO(company)".
 * ─────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "DropTraQ",
  legalName: "DropTraQ", // TODO(company): confirm registered legal name (the BoQ document says "DropTraQ LTD").
  tagline: "Bringing Intelligence to Every Drop.",
  shortDescription:
    "DropTraQ is a Rwandan technology startup developing IoT-enabled monitoring for water distribution networks, turning water-flow data into actionable insight for infrastructure operators.",
  location: "Kigali, Rwanda",

  /** Canonical production URL — used for metadata, sitemap and Open Graph. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://droptraq.com", // TODO(company): confirm domain.

  contact: {
    /** TODO(company): [COMPANY_EMAIL] — public inbox shown in the footer and contact page. */
    email: null as string | null,
    /** TODO(company): [COMPANY_PHONE] — optional. */
    phone: null as string | null,
  },

  social: {
    /** TODO(company): [LINKEDIN_URL] */
    linkedin: null as string | null,
    /** TODO(company): [X_URL] */
    x: null as string | null,
    /** TODO(company): [GITHUB_URL] */
    github: null as string | null,
  },

  mission:
    "To develop intelligent monitoring technologies that improve visibility, accountability, and decision-making across water distribution systems.",
  vision:
    "To contribute to a future where essential infrastructure is more connected, measurable, and intelligently managed.",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Our Technology", href: "/technology" },
  { label: "The Problem", href: "/problem" },
  { label: "About Us", href: "/about" },
  { label: "Insights", href: "/insights" },
] as const;

export type TeamMember = {
  /** When false, the profile is hidden from the production site. */
  published: boolean;
  name: string;
  role: string;
  bio: string | null;
  /** Path under /public, e.g. "/images/team/jane-doe.jpg" (portrait, ≥ 900px tall). */
  photo: string | null;
  linkedin: string | null;
};

/**
 * TODO(company): Fill in verified team profiles, then set `published: true`.
 * Names, roles and biographies must come from the team — never guessed.
 * Individual portrait photos are not in the shared Drive folder yet.
 */
export const team: TeamMember[] = [
  { published: false, name: "[TEAM_MEMBER_NAME]", role: "Chief Executive Officer", bio: "[TEAM_MEMBER_BIO]", photo: null, linkedin: null },
  { published: false, name: "[TEAM_MEMBER_NAME]", role: "Chief Operating Officer", bio: "[TEAM_MEMBER_BIO]", photo: null, linkedin: null },
  { published: false, name: "[TEAM_MEMBER_NAME]", role: "Chief Technology Officer", bio: "[TEAM_MEMBER_BIO]", photo: null, linkedin: null },
  { published: false, name: "[TEAM_MEMBER_NAME]", role: "Product Engineering / IoT", bio: "[TEAM_MEMBER_BIO]", photo: null, linkedin: null },
];

export const publishedTeam = () => team.filter((m) => m.published);
export const showPendingProfiles = process.env.NODE_ENV !== "production";

/**
 * Genuine company photography (from the DropTraQ shared Drive).
 * Field-visit images are captioned as learning visits only: they do not
 * depict a DropTraQ deployment, partnership or endorsement.
 */
export const photos = {
  teamWorkingSession: {
    src: "/images/team/team-working-session-laptops.jpg",
    width: 2048, height: 1152,
    alt: "DropTraQ team members working together at laptops during a development session",
  },
  teamDesignReview: {
    src: "/images/team/team-design-review-notebook.jpg",
    width: 1150, height: 1280,
    alt: "Two DropTraQ team members reviewing design notes in a notebook",
  },
  teamInnovationHub: {
    src: "/images/team/team-kigali-innovation-hub.jpg",
    width: 1650, height: 2200,
    alt: "Four DropTraQ team members standing outside an innovation hub in Kigali",
  },
  prototypeComponents: {
    src: "/images/prototype/prototype-edge-node-components.jpg",
    width: 810, height: 1080,
    alt: "Prototype hardware laid out on a bench: ESP32 boards, flow sensors, prototyping boards and wiring",
  },
  prototypeWiring: {
    src: "/images/prototype/prototype-edge-node-wiring.jpg",
    width: 810, height: 1080,
    alt: "Edge-node prototype components with sensors and jumper wiring on a workbench",
  },
  conceptSketch: {
    src: "/images/prototype/network-concept-sketch.jpg",
    width: 1536, height: 2048,
    alt: "Hand-drawn engineering sketch of a water distribution network with proposed monitoring points",
  },
  fieldIntake: {
    src: "/images/field/field-visit-intake-channel.jpg",
    width: 2200, height: 1650,
    alt: "Team members on a walkway above a raw-water intake channel during a field learning visit",
  },
  fieldBriefing: {
    src: "/images/field/field-visit-river-intake-briefing.jpg",
    width: 2200, height: 1650,
    alt: "An engineer briefing team members beside a river intake during a field learning visit",
  },
  fieldControlRoom: {
    src: "/images/field/field-visit-control-room.jpg",
    width: 2200, height: 1650,
    alt: "Team members in a treatment-plant control room during a field learning visit",
  },
  fieldFiltration: {
    src: "/images/field/field-visit-filtration-walkway.jpg",
    width: 1650, height: 2200,
    alt: "Team members walking along filtration beds during a field learning visit",
  },
  pipeManifold: {
    src: "/images/field/distribution-pipe-manifold.jpg",
    width: 1650, height: 2200,
    alt: "Large water pipes, valves and a manifold inside a pumping hall",
  },
  pumpRoom: {
    src: "/images/field/field-visit-pump-room.jpg",
    width: 1650, height: 2200,
    alt: "Team members inspecting a pump room with lifting gear during a field learning visit",
  },
} as const;

export type Photo = (typeof photos)[keyof typeof photos];
