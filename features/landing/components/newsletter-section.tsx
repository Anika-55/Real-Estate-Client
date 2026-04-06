"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-600">
            Newsletter
          </p>
          <h3 className="mt-3 text-2xl font-bold text-slate-900">
            Get updates on new listings and price drops
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Be the first to know when verified properties matching your goals
            hit the market.
          </p>
          <form className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email address"
              className="h-11 flex-1 rounded-md border border-slate-300 bg-white px-4 text-sm outline-none ring-orange-500 transition focus:ring-2"
            />
            <Button type="submit" className="sm:w-auto">
              Subscribe
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
