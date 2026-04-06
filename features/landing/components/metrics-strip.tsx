"use client";

import { motion } from "framer-motion";
import { metrics } from "@/features/landing/data/landing-data";

export function MetricsStrip() {
  return (
    <section className="bg-slate-950 py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
        {metrics.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="rounded-xl border border-white/10 bg-white/5 p-4 text-center"
          >
            <p className="text-xl font-bold text-white sm:text-2xl">{item.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.1em] text-slate-300">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
