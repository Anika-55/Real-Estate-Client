"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { amenities } from "@/features/landing/data/landing-data";
import { SectionHeading } from "@/features/landing/components/section-heading";

export function AmenitiesSection() {
  return (
    <section
      id="amenities"
      className="scroll-mt-24 bg-[var(--muted)] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Real Amenities"
          title="Every detail designed for comfort"
          description="From smart living to wellness spaces, your lifestyle is built into every square foot."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <Card className="h-full">
                <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--primary)_16%,transparent)] text-[var(--primary)]">
                    <amenity.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-medium text-[var(--foreground)]">
                    {amenity.title}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
