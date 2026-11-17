import Link from "next/link";
import { Mail } from "lucide-react";
import { nav, site } from "@/content/site";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { CurrentYear } from "./current-year";

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function SiteFooter() {
  const socials = [
    site.social.linkedin && { label: "LinkedIn", href: site.social.linkedin, icon: LinkedInIcon },
  ].filter(Boolean) as { label: string; href: string; icon: typeof LinkedInIcon }[];

  return (
    <footer className="relative border-t border-line bg-ink-950">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">{site.shortDescription}</p>
          <p className="mt-5 font-mono text-xs uppercase tracking-wider text-subtle">{site.location}</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="font-mono text-xs uppercase tracking-wider text-subtle">Company</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="text-muted transition-colors hover:text-fg">{n.label}</Link></li>
            ))}
            <li><Link href="/contact" className="text-muted transition-colors hover:text-fg">Contact Us</Link></li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="font-mono text-xs uppercase tracking-wider text-subtle">Get in touch</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {site.contact.email && (
              <li>
                <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-2 text-muted hover:text-fg">
                  <Mail aria-hidden className="size-4" /> {site.contact.email}
                </a>
              </li>
            )}
            <li><Link href="/contact" className="text-muted hover:text-fg">Send us a message →</Link></li>
            <li><Link href="/contact?type=talent" className="text-muted hover:text-fg">Engineering talent →</Link></li>
          </ul>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`DropTraQ on ${s.label}`}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-line-strong text-muted hover:border-cyan hover:text-cyan">
                    <s.icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
      <Container className="flex flex-col gap-4 border-t border-line py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>© <CurrentYear /> {site.legalName}. All rights reserved.</p>
        <ul className="flex gap-6">
          <li><Link href="/privacy" className="hover:text-fg">Privacy Policy</Link></li>
          <li><Link href="/terms" className="hover:text-fg">Terms of Use</Link></li>
        </ul>
      </Container>
    </footer>
  );
}
