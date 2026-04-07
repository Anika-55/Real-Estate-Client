"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export function LandingHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const links = [
    { label: "About Us", href: "/about" },
    { label: "Properties", href: isHome ? "#properties" : "/#properties" },
    { label: "Amenities", href: isHome ? "#amenities" : "/#amenities" },
    { label: "Agents", href: "/agent" },
    { label: "Contact", href: isHome ? "#contact" : "/#contact" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={
        isHome
          ? "absolute inset-x-0 top-0 z-20"
          : "sticky inset-x-0 top-0 z-30 border-b border-[var(--border)] bg-[var(--card)]/95 backdrop-blur"
      }
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={() => setIsMobileOpen(false)}
          className={
            isHome
              ? "text-lg font-bold tracking-tight text-white"
              : "text-lg font-bold tracking-tight text-[var(--foreground)]"
          }
        >
          Housix
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className={
                isHome
                  ? "text-sm font-medium text-slate-200 transition hover:text-white"
                  : "text-sm font-medium text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/login"
              className={
                isHome
                  ? "inline-flex h-9 items-center justify-center rounded-md border border-white/50 px-4 text-xs font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  : "inline-flex h-9 items-center justify-center rounded-md border border-[var(--border)] px-4 text-xs font-semibold text-[var(--foreground)] transition hover:bg-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              }
            >
              Login
            </Link>
            <Link
              href="/register"
              className={
                isHome
                  ? "inline-flex h-9 items-center justify-center rounded-md bg-white px-4 text-xs font-semibold text-slate-950 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  : "inline-flex h-9 items-center justify-center rounded-md bg-[var(--primary)] px-4 text-xs font-semibold text-[var(--primary-foreground)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              }
            >
              Register
            </Link>
          </div>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className={
              isHome
                ? "inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/40 bg-black/20 text-white md:hidden"
                : "inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] md:hidden"
            }
          >
            {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <Link
            href={isHome ? "#contact" : "/#contact"}
            onClick={() => setIsMobileOpen(false)}
            className={
              isHome
                ? "hidden h-9 items-center justify-center rounded-md border border-white/50 px-4 text-xs font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:inline-flex"
                : "hidden h-9 items-center justify-center rounded-md border border-[var(--border)] px-4 text-xs font-semibold text-[var(--foreground)] transition hover:bg-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:inline-flex"
            }
          >
            Book Visit
          </Link>
        </div>
      </div>

      {isMobileOpen ? (
        <div
          className={
            isHome
              ? "mx-4 mb-4 rounded-xl border border-white/20 bg-black/60 p-3 backdrop-blur md:hidden"
              : "mx-4 mb-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 md:hidden"
          }
        >
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={`mobile-${link.label}`}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className={
                  isHome
                    ? "rounded-md px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
                    : "rounded-md px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] transition hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                }
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={isHome ? "#contact" : "/#contact"}
              onClick={() => setIsMobileOpen(false)}
              className={
                isHome
                  ? "mt-1 rounded-md px-3 py-2 text-sm font-semibold text-white bg-white/10"
                  : "mt-1 rounded-md px-3 py-2 text-sm font-semibold text-[var(--foreground)] bg-[var(--muted)]"
              }
            >
              Book Visit
            </Link>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setIsMobileOpen(false)}
                className={
                  isHome
                    ? "rounded-md border border-white/40 px-3 py-2 text-center text-sm font-semibold text-white"
                    : "rounded-md border border-[var(--border)] px-3 py-2 text-center text-sm font-semibold text-[var(--foreground)]"
                }
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileOpen(false)}
                className={
                  isHome
                    ? "rounded-md bg-white px-3 py-2 text-center text-sm font-semibold text-slate-950"
                    : "rounded-md bg-[var(--primary)] px-3 py-2 text-center text-sm font-semibold text-[var(--primary-foreground)]"
                }
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </motion.header>
  );
}
