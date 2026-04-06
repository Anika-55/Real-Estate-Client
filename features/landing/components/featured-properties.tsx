"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { featuredProperties } from "@/features/landing/data/landing-data";
import { SectionHeading } from "@/features/landing/components/section-heading";

export function FeaturedProperties() {
  return (
    <section
      id="properties"
      className="scroll-mt-24 bg-[var(--background)] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Latest Properties"
          title="Find homes you can fall in love with"
          description="Handpicked listings with complete details, market-ready pricing, and premium neighborhoods."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="overflow-hidden">
                <div className="h-56 w-full">
                  <Image
                    src={property.image}
                    alt={property.title}
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent>
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--primary)]">
                    {property.location}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-[var(--foreground)]">
                    {property.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                    {property.beds} Beds | {property.baths} Baths | {property.area}
                  </p>
                  <p className="mt-4 text-xl font-bold text-[var(--foreground)]">
                    {property.price}
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
