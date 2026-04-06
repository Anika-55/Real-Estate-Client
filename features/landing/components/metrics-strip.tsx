"use client";

import { motion } from "framer-motion";
import { metrics } from "@/features/landing/data/landing-data";

export function MetricsStrip() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-10 sm:py-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.23),rgba(15,23,42,0.95)_42%,rgba(2,6,23,1)_75%)]" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-orange-300">
              Our Impact
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
              Numbers that build trust
            </h3>
          </div>
          <p className="hidden text-sm text-slate-300 md:block">
            Verified listings, transparent process, proven outcomes.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {metrics.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.55,
                delay: index * 0.09,
                ease: "easeOut",
              }}
              className="rounded-2xl border border-white/15 bg-white/5 p-5 text-left backdrop-blur-sm"
            >
              <p className="text-2xl font-bold text-white sm:text-3xl">
                {item.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.1em] text-slate-300">
                {item.label}
              </p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-orange-400/70 to-transparent" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
