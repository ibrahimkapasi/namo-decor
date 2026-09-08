import { Suspense } from "react";
import { ContactSection } from "@/components/contact/contact-section";
import { FloatingContact } from "@/components/contact/floating-contact";
import { SiteFooter } from "@/components/contact/site-footer";
import { HeroExhibition } from "@/components/hero/hero-exhibition";
import { SiteHeader } from "@/components/navigation/site-header";
import { ReviewsServer } from "@/components/reviews/reviews-server";
import { ReviewsSkeleton } from "@/components/reviews/reviews-section";
import { FounderStory } from "@/components/sections/founder-story";
import { PortfolioExhibition } from "@/components/sections/portfolio-exhibition";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesExhibition } from "@/components/sections/services-exhibition";
import { StudioStory } from "@/components/sections/studio-story";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <HeroExhibition />
        <StudioStory />
        <PortfolioExhibition />
        <ServicesExhibition />
        <ProcessSection />
        <FounderStory />
        <Suspense fallback={<ReviewsSkeleton />}><ReviewsServer /></Suspense>
        <ContactSection />
      </main>
      <SiteFooter />
      <FloatingContact />
    </>
  );
}
