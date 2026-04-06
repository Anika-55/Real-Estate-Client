import { AgentsSection } from "@/features/landing/components/agents-section";
import { AmenitiesSection } from "@/features/landing/components/amenities-section";
import { FeaturedProperties } from "@/features/landing/components/featured-properties";
import { HeroSection } from "@/features/landing/components/hero-section";
import { LandingFooter } from "@/features/landing/components/landing-footer";
import { LandingHeader } from "@/features/landing/components/landing-header";
import { MetricsStrip } from "@/features/landing/components/metrics-strip";
import { NewsletterSection } from "@/features/landing/components/newsletter-section";
import { ProcessSection } from "@/features/landing/components/process-section";

export function LandingPage() {
  return (
    <main className="bg-white">
      <div className="relative">
        <LandingHeader />
        <HeroSection />
      </div>
      <MetricsStrip />
      <FeaturedProperties />
      <AmenitiesSection />
      <ProcessSection />
      <AgentsSection />
      <NewsletterSection />
      <LandingFooter />
    </main>
  );
}
