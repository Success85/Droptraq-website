import type { Metadata } from "next";
import { Suspense } from "react";
import { Building2, Cpu, MessageSquare, Phone, Users } from "lucide-react";
import { ContactForm, ContactFormWithParams } from "@/components/contact/contact-form";
import { Container, Section } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with DropTraQ about infrastructure monitoring, technology partnerships, engineering roles or general inquiries.",
  alternates: { canonical: "/contact" },
};

const pathways = [
  { icon: Building2, title: "Enterprise & infrastructure", body: "Water utilities, infrastructure operators and public institutions interested in network visibility, or in a future pilot." },
  { icon: Cpu, title: "Technology partnerships", body: "Hardware, connectivity, cloud and research partners who want to build infrastructure intelligence with us." },
  { icon: Users, title: "Engineering talent", body: "Embedded, hardware, backend and data engineers, including prospective technical co-founders." },
  { icon: MessageSquare, title: "General inquiries", body: "Investors, media, students and anyone curious about what we are building." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let&apos;s Start a <span className="text-gradient">Conversation.</span></>}
        intro={<p>Whether you run a network, build technology or want to join the team, we would like to hear from you.</p>}
      />
      <Section className="!pt-0">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-4">
            <h2 className="font-mono text-[11px] uppercase tracking-wider text-subtle">Who we talk to</h2>
            <ul className="mt-5 space-y-3">
              {pathways.map((p) => (
                <li key={p.title} className="rounded-2xl border border-line bg-ink-850/60 p-5">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-9 items-center justify-center rounded-lg border border-line-strong text-cyan"><p.icon aria-hidden className="size-4" /></span>
                    <h3 className="font-display text-base text-fg">{p.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl border border-line p-5 text-sm text-muted">
              <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">Based in</p>
              <p className="mt-2 text-fg">{site.location}</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-subtle">Phone</p>
              <ul className="mt-2 space-y-1.5">
                {site.contact.phones.map((p) => (
                  <li key={p.tel}>
                    <a href={`tel:${p.tel}`} className="inline-flex items-center gap-2 text-fg hover:text-cyan">
                      <Phone aria-hidden className="size-4 text-cyan" /> {p.display}
                    </a>
                  </li>
                ))}
              </ul>
              {site.contact.email && (
                <>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-subtle">Email</p>
                  <a href={`mailto:${site.contact.email}`} className="mt-2 block text-fg hover:text-cyan">{site.contact.email}</a>
                </>
              )}
            </div>
          </aside>
          <div className="lg:col-span-8">
            <div className="rounded-3xl border border-line bg-ink-850/50 p-6 sm:p-10">
              <Suspense fallback={<ContactForm />}>
                <ContactFormWithParams />
              </Suspense>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
