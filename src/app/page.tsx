import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { ProblemCards } from "@/components/home/problem-cards";
import {
  ApproachSection, ClosingCta, ProductPreview, TeamSection, TechPreview, VisionSection,
} from "@/components/home/sections";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ProblemCards />
      <ApproachSection />
      <TechPreview />
      <ProductPreview />
      <TeamSection />
      <VisionSection />
      <ClosingCta />
    </>
  );
}
