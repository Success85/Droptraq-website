import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { site } from "@/content/site";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "DropTraQ | Infrastructure Intelligence for Water Distribution",
    template: "%s | DropTraQ",
  },
  description: site.shortDescription,
  applicationName: "DropTraQ",
  keywords: [
    "DropTraQ", "IoT water monitoring", "non-revenue water", "water distribution", "smart water",
    "embedded systems", "ESP32", "MQTT telemetry", "Rwanda", "infrastructure intelligence",
  ],
  openGraph: {
    type: "website",
    siteName: "DropTraQ",
    locale: "en",
    title: "DropTraQ | Bringing Intelligence to Every Drop",
    description: site.shortDescription,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/images/brand/droptraq-icon-256.png`,
  description: site.shortDescription,
  address: { "@type": "PostalAddress", addressLocality: "Kigali", addressCountry: "RW" },
  ...(site.contact.email ? { email: site.contact.email } : {}),
  ...(site.social.linkedin ? { sameAs: [site.social.linkedin] } : {}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-dvh bg-ink-900 text-fg">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
