/**
 * References for every statistic shown on the site.
 * Each figure on the site points to an entry here by `id`.
 * Prefer primary sources (official reports) over press coverage.
 */
export type Source = {
  id: string;
  label: string;
  publisher: string;
  year: string;
  url?: string;
  note?: string;
};

export const sources: Record<string, Source> = {
  oag2024: {
    id: "oag2024",
    label: "Annual Audit Report, year ended 30 June 2024",
    publisher: "Office of the Auditor General of State Finances, Rwanda",
    year: "2024",
    url: "https://www.oag.gov.rw/fileadmin/user_upload/OAG/Audit_Reports/ANNUAL_AUDIT_REPORT_2024.pdf",
  },
  newtimes2026: {
    id: "newtimes2026",
    label: "Senators call for tougher measures to curb water losses",
    publisher: "The New Times (Rwanda)",
    year: "2026",
    url: "https://www.newtimes.co.rw/article/33985/news/rwanda/senators-call-for-tougher-measures-to-curb-water-losses",
    note: "Reports the Auditor General's NRW figures and the 25% reduction target.",
  },
  wasacBriefing: {
    id: "wasacBriefing",
    label: "Research meeting with WASAC operations and GIS teams",
    publisher: "DropTraQ field research",
    year: "8 April 2026",
    note: "Figures and loss categories as described to our team by WASAC.",
  },
  iwa: {
    id: "iwa",
    label: "Performance Indicators for Water Supply Services (standard water balance)",
    publisher: "Alegre et al., IWA Publishing",
    year: "2006",
  },
};

/** Ordered list for the references block; numbering follows this order. */
export const problemReferences = ["oag2024", "newtimes2026", "wasacBriefing", "iwa"] as const;
export const refNumber = (id: string) => problemReferences.indexOf(id as (typeof problemReferences)[number]) + 1;
