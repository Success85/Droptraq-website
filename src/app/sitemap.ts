import type { MetadataRoute } from "next";
import { publishedInsights } from "@/content/insights";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/technology", "/problem", "/about", "/insights", "/contact", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({
      url: `${site.url}${p}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : p === "/privacy" || p === "/terms" ? 0.3 : 0.8,
    })),
    ...publishedInsights().map((i) => ({
      url: `${site.url}/insights/${i.slug}`,
      lastModified: i.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
