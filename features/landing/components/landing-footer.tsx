"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const quickLinks = [
  { label: "Buy Property", href: "#properties" },
  { label: "Sell Property", href: "#contact" },
  { label: "Rentals", href: "#properties" },
  { label: "Market Insights", href: "#testimonials" },
];

const companyLinks = [
  { label: "About Us", href: "#home" },
  { label: "Our Agents", href: "#agents" },
  { label: "Careers", href: "/login" },
  { label: "Contact", href: "#contact" },
];

export function LandingFooter() {
  return (
    <footer className="relative overflow-hidden bg-slate-950">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: "url('/images/landing-reference.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/94 to-slate-900/70" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8"
      >
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-300">
              Housix
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              Find the right home, backed by the right team.
            </h3>
            <p className="mt-3 max-w-md text-sm text-slate-300">
              Trusted advisors, verified properties, and a smooth end-to-end
              buying experience across major cities.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 transition hover:text-orange-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Company</h4>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 transition hover:text-orange-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} Housix. All rights reserved.</p>
          <p>Crafted for modern real estate experiences.</p>
        </div>
      </motion.div>
    </footer>
  );
}
