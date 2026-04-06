"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const links = [
  { label: "Properties", href: "#properties" },
  { label: "Amenities", href: "#amenities" },
  { label: "Agents", href: "#agents" },
  { label: "Contact", href: "#contact" },
];

export function LandingHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="absolute inset-x-0 top-0 z-20"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold tracking-tight text-white">
          Housix
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-200 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="#contact"
            className="hidden h-9 items-center justify-center rounded-md border border-white/50 px-4 text-xs font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:inline-flex"
          >
            Book Visit
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
