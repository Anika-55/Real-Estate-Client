"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  testimonials,
  trustedByLogos,
} from "@/features/landing/data/landing-data";

export function SocialProofSection() {
  return (
    <section
      id="testimonials"
      className="border-y border-slate-200 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16"
      aria-labelledby="social-proof-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-600">
            Social Proof
          </p>
          <h2
            id="social-proof-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Trusted by buyers, families, and investors
          </h2>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <Card className="h-full border-slate-200">
                <CardContent className="flex h-full flex-col">
                  <p className="text-sm text-orange-600">
                    {"★".repeat(item.rating)}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    "{item.quote}"
                  </p>
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-slate-900">
                      {item.author}
                    </p>
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                      {item.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Trusted By
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {trustedByLogos.map((logo) => (
              <div
                key={logo.id}
                className="rounded-lg border border-slate-200 px-3 py-2 text-center text-xs font-semibold text-slate-600"
              >
                {logo.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
