import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How the DropTraQ website handles personal information.",
  alternates: { canonical: "/privacy" },
};

// TODO(company): have this reviewed against Rwanda's Law No. 058/2021 on the protection of personal data and privacy before launch.
export default function PrivacyPage() {
  return (
    <article className="pb-24 pt-36 sm:pt-44">
      <Container className="max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-wider text-subtle">Last updated 17 November 2026</p>
        <div className="mt-12 space-y-10 leading-relaxed text-muted [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-fg [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
          <section>
            <h2>Who we are</h2>
            <p>This website is operated by {site.legalName}, based in {site.location}. This policy explains what information the website collects and how it is used.</p>
          </section>
          <section>
            <h2>Information you give us</h2>
            <p>When you use the contact form we receive the details you enter: your name, email address, organization (optional), inquiry type and message.</p>
            <p>We use this information only to read and reply to your inquiry and to keep a record of our correspondence. We do not sell it, and we do not add you to marketing lists.</p>
          </section>
          <section>
            <h2>Service providers</h2>
            <p>Contact-form messages are stored in a secure database hosted by Supabase, and a copy is sent to our team by email through a third-party email delivery provider. The website itself is hosted by a third-party hosting provider. These providers process data on our behalf to run the service. Stored messages are accessible only to the DropTraQ team.</p>
          </section>
          <section>
            <h2>Cookies and analytics</h2>
            <p>The website does not use advertising or analytics cookies. Your browser may store basic technical data needed for the site to work.</p>
          </section>
          <section>
            <h2>Retention</h2>
            <p>We keep inquiry correspondence for as long as needed to respond and to maintain reasonable business records, and then delete it.</p>
          </section>
          <section>
            <h2>Your rights</h2>
            <p>You may ask us to access, correct or delete the personal information you have sent us. Use the contact form{site.contact.email ? <> or email <a className="text-fg underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></> : null} to make a request.</p>
          </section>
          <section>
            <h2>Changes</h2>
            <p>We may update this policy as the website and company evolve. The date at the top shows when it last changed.</p>
          </section>
        </div>
      </Container>
    </article>
  );
}
