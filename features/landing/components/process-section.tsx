"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/features/landing/components/section-heading";

const steps = [
  {
    id: "01",
    title: "Discover",
    text: "Tell us your preferred location, budget, and property type.",
  },
  {
    id: "02",
    title: "Shortlist",
    text: "Receive curated listings from our local market specialists.",
  },
  {
    id: "03",
    title: "Visit",
    text: "Book physical or virtual tours with side-by-side comparisons.",
  },
  {
    id: "04",
    title: "Close",
    text: "Get negotiation, legal, and financing support from our experts.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title="A simple path to your next property"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.article
              key={step.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-600">
                Step {step.id}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{step.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
