"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export function LandingHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isElevated = !isHome || hasScrolled;

  const links = [
    { label: "About Us", href: "/about" },
    { label: "Properties", href: isHome ? "#properties" : "/#properties" },
    { label: "Amenities", href: isHome ? "#amenities" : "/#amenities" },
    { label: "Agents", href: "/agent" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Contact", href: isHome ? "#contact" : "/#contact" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={
        isElevated
          ? "sticky inset-x-0 top-0 z-30 border-b border-[var(--border)] bg-[var(--card)]/95 backdrop-blur transition-colors"
          : "sticky inset-x-0 top-0 z-30 bg-transparent transition-colors"
      }
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={() => setIsMobileOpen(false)}
          className={
            isElevated
              ? "text-lg font-bold tracking-tight text-[var(--foreground)]"
              : "text-lg font-bold tracking-tight text-white"
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
                isElevated
                  ? "text-sm font-medium text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
                  : "text-sm font-medium text-slate-200 transition hover:text-white"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div
            className={
              isElevated
                ? "hidden items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--muted)]/70 p-1 md:flex"
                : "hidden items-center gap-1 rounded-full border border-white/25 bg-black/15 p-1 md:flex"
            }
          >
            <Link
              href="/login"
              className={
                isElevated
                  ? "inline-flex h-8 items-center justify-center rounded-full px-3 text-xs font-semibold text-[var(--muted-foreground)] transition hover:bg-[var(--card)] hover:text-[var(--foreground)]"
                  : "inline-flex h-8 items-center justify-center rounded-full px-3 text-xs font-semibold text-white/85 transition hover:bg-white/15 hover:text-white"
              }
            >
              Login
            </Link>
            <Link
              href="/register"
              className={
                isElevated
                  ? "inline-flex h-8 items-center justify-center rounded-full bg-[var(--primary)] px-3 text-xs font-semibold text-[var(--primary-foreground)] transition hover:brightness-110"
                  : "inline-flex h-8 items-center justify-center rounded-full bg-white px-3 text-xs font-semibold text-slate-950 transition hover:bg-slate-200"
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
              isElevated
                ? "inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] md:hidden"
                : "inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/40 bg-black/20 text-white md:hidden"
            }
          >
            {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <Link
            href={isHome ? "#contact" : "/#contact"}
            onClick={() => setIsMobileOpen(false)}
            className={
              isElevated
                ? "hidden h-9 items-center justify-center rounded-md border border-[var(--border)] px-4 text-xs font-semibold text-[var(--foreground)] transition hover:bg-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] xl:inline-flex"
                : "hidden h-9 items-center justify-center rounded-md border border-white/50 px-4 text-xs font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 xl:inline-flex"
            }
          >
            Book Visit
          </Link>
        </div>
      </div>

      {isMobileOpen ? (
        <div
          className={
            isElevated
              ? "mx-4 mb-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 md:hidden"
              : "mx-4 mb-4 rounded-xl border border-white/20 bg-black/60 p-3 backdrop-blur md:hidden"
          }
        >
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={`mobile-${link.label}`}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className={
                  isElevated
                    ? "rounded-md px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] transition hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                    : "rounded-md px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
                }
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setIsMobileOpen(false)}
                className={
                  isElevated
                    ? "rounded-md border border-[var(--border)] px-3 py-2 text-center text-sm font-semibold text-[var(--foreground)]"
                    : "rounded-md border border-white/40 px-3 py-2 text-center text-sm font-semibold text-white"
                }
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileOpen(false)}
                className={
                  isElevated
                    ? "rounded-md bg-[var(--primary)] px-3 py-2 text-center text-sm font-semibold text-[var(--primary-foreground)]"
                    : "rounded-md bg-white px-3 py-2 text-center text-sm font-semibold text-slate-950"
                }
              >
                Register
              </Link>
            </div>
            <Link
              href={isHome ? "#contact" : "/#contact"}
              onClick={() => setIsMobileOpen(false)}
              className={
                isElevated
                  ? "mt-1 rounded-md bg-[var(--muted)] px-3 py-2 text-sm font-semibold text-[var(--foreground)]"
                  : "mt-1 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white"
              }
            >
              Book Visit
            </Link>
          </nav>
        </div>
      ) : null}
    </motion.header>
  );
}
