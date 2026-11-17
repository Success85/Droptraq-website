import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing the use of the DropTraQ website.",
  alternates: { canonical: "/terms" },
};

// TODO(company): have these terms reviewed by legal counsel before launch.
export default function TermsPage() {
  return (
    <article className="pb-24 pt-36 sm:pt-44">
      <Container className="max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">Terms of Use</h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-wider text-subtle">Last updated 17 November 2026</p>
        <div className="mt-12 space-y-10 leading-relaxed text-muted [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-fg [&_p]:mt-3">
          <section>
            <h2>About this website</h2>
            <p>This website is provided by {site.legalName} to share information about our company, our work and our technology. By using it, you agree to these terms.</p>
          </section>
          <section>
            <h2>Information, not an offer</h2>
            <p>Content on this site describes technology that is under active development. Descriptions of prototypes, roadmaps and planned capabilities are not commitments, warranties or offers to supply any product or service.</p>
          </section>
          <section>
            <h2>Illustrative data</h2>
            <p>Dashboards, network diagrams and figures marked as simulated, illustrative or conceptual use generated example data. They do not represent measurements from any real network, utility or customer.</p>
          </section>
          <section>
            <h2>Intellectual property</h2>
            <p>The DropTraQ name, logo, text, graphics and photographs on this site belong to {site.legalName} or are used with permission. You may share links to the site, but you may not reproduce its content for commercial purposes without our written permission.</p>
          </section>
          <section>
            <h2>Third-party references</h2>
            <p>References to other organizations, standards or technologies are for information only and do not imply endorsement by or partnership with them.</p>
          </section>
          <section>
            <h2>Liability</h2>
            <p>The site is provided &ldquo;as is&rdquo;. To the extent permitted by law, we are not liable for any loss arising from use of, or reliance on, its content.</p>
          </section>
          <section>
            <h2>Governing law</h2>
            <p>These terms are governed by the laws of the Republic of Rwanda.</p>
          </section>
        </div>
      </Container>
    </article>
  );
}
