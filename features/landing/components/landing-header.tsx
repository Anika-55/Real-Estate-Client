"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const links = ["Properties", "Amenities", "Agents", "Contact"];

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
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-slate-200 transition hover:text-white"
            >
              {link}
            </a>
          ))}
        </nav>
        <Button variant="outline" size="sm" className="hidden sm:inline-flex">
          Book Visit
        </Button>
      </div>
    </motion.header>
  );
}
