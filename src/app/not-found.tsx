import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80dvh] items-center pt-24">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <Container>
        <p className="eyebrow">404 · no signal</p>
        <h1 className="mt-5 font-display text-4xl font-semibold sm:text-6xl">This node isn&apos;t reporting.</h1>
        <p className="mt-5 max-w-lg text-lg text-muted">The page you were looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" arrow>Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">Contact us</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
