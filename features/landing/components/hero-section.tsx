"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { heroVideoSources } from "@/features/landing/data/landing-data";

export function HeroSection() {
  const goToSection = (id: string) => () => {
    const target = document.getElementById(id);
    if (target) {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] overflow-hidden bg-slate-950">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/landing-reference.png"
      >
        {heroVideoSources.map((src) => (
          <source key={src} src={src} type="video/mp4" />
        ))}
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-slate-950/55" />
      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-end px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <Badge className="border-white/40 bg-black/30 text-orange-200">
            Premium Real Estate
          </Badge>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Explore Prime Real Estate Opportunities With Confidence Today
          </h1>
          <p className="mt-5 max-w-xl text-sm text-slate-200 sm:text-base">
            Discover modern apartments, investment-ready homes, and luxury
            villas with verified listings and expert guidance.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={goToSection("properties")}>
              Explore Properties
            </Button>
            <Button variant="outline" size="lg" onClick={goToSection("contact")}>
              Book Free Consultation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
