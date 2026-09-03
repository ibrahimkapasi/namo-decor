import { Suspense } from "react";
import { HeroExhibition } from "@/components/hero/hero-exhibition";
import { SiteHeader } from "@/components/navigation/site-header";
import { StudioStory } from "@/components/sections/studio-story";
import { ServicesExhibition } from "@/components/sections/services-exhibition";
import { FutureWorkTransition } from "@/components/sections/future-work-transition";
import { PortfolioExhibition } from "@/components/sections/portfolio-exhibition";
import { FounderStory } from "@/components/sections/founder-story";
import { ReviewsServer } from "@/components/reviews/reviews-server";
import { ReviewsSkeleton } from "@/components/reviews/reviews-section";
import { ContactSection } from "@/components/contact/contact-section";
import { FloatingContact } from "@/components/contact/floating-contact";
import { SiteFooter } from "@/components/contact/site-footer";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <HeroExhibition />
      <StudioStory />
      <ServicesExhibition />
      <FutureWorkTransition />
      <PortfolioExhibition />
      <FounderStory />
      <Suspense fallback={<ReviewsSkeleton />}><ReviewsServer /></Suspense>
      <ContactSection />
      <SiteFooter />
      <FloatingContact />
    </main>
  );
}
