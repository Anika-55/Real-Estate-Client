import { AgentsSection } from "@/features/landing/components/agents-section";
import { AmenitiesSection } from "@/features/landing/components/amenities-section";
import { FeaturedProperties } from "@/features/landing/components/featured-properties";
import { HeroSection } from "@/features/landing/components/hero-section";
import { LandingFooter } from "@/features/landing/components/landing-footer";
import { MetricsStrip } from "@/features/landing/components/metrics-strip";
import { NewsletterSection } from "@/features/landing/components/newsletter-section";
import { ProcessSection } from "@/features/landing/components/process-section";
import { SocialProofSection } from "@/features/landing/components/social-proof-section";

export function LandingPage() {
  return (
    <main id="main-content" className="bg-[var(--background)] text-[var(--foreground)]">
      <div className="relative">
        <HeroSection />
      </div>
      <MetricsStrip />
      <SocialProofSection />
      <FeaturedProperties />
      <AmenitiesSection />
      <ProcessSection />
      <AgentsSection />
      <NewsletterSection />
      <LandingFooter />
    </main>
  );
}
