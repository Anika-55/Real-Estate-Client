"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  aboutFaq,
  aboutMetrics,
  coreValues,
  testimonials,
} from "@/features/about/data/about-data";
import { experts } from "@/features/expertise/data/experts-data";

export function AboutPage() {
  return (
    <main className="bg-[var(--background)] pb-16">
      <section className="border-b border-[var(--border)] bg-[var(--card)] pt-16 sm:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
                About Us
              </p>
              <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-[var(--foreground)] sm:text-4xl">
                Your Partner in Finding the Perfect Property and Community
              </h1>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[var(--muted-foreground)] lg:justify-self-end">
              We combine local market expertise with transparent service to help
              families, investors, and first-time buyers choose properties with
              confidence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="mt-8 grid gap-4 lg:grid-cols-[1.9fr_1fr]"
          >
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80"
                alt="Real estate team discussing a property"
                width={1600}
                height={900}
                className="h-[320px] w-full object-cover sm:h-[420px]"
                priority
              />
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80"
                  alt="Agent consulting with clients"
                  width={1200}
                  height={900}
                  className="h-40 w-full object-cover lg:h-[202px]"
                />
              </div>
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Premium home exterior"
                  width={1200}
                  height={900}
                  className="h-40 w-full object-cover lg:h-[202px]"
                />
              </div>
            </div>
          </motion.div>

          <div className="mt-6 grid grid-cols-2 gap-4 pb-10 sm:grid-cols-4">
            {aboutMetrics.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4"
              >
                <p className="text-xl font-bold text-[var(--foreground)]">{item.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.11em] text-[var(--muted-foreground)]">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-[var(--card)]">
            {coreValues.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="grid gap-4 p-5 md:grid-cols-[0.4fr_1fr] md:p-6"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                  {value.title}
                </h3>
                <p className="text-sm leading-7 text-[var(--foreground)]">{value.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-14 sm:pb-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55 }}
            className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
              Trust Through Openness
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[var(--foreground)]">
              We believe in clear communication and real value
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
              Every recommendation comes from research, market context, and
              client goals. We prioritize clarity so you can decide confidently.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55 }}
            className="overflow-hidden rounded-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=1200&q=80"
              alt="Team collaboration"
              width={1200}
              height={900}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section className="bg-[var(--card)] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
            Testimonials
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {testimonials.map((item, idx) => (
              <motion.article
                key={item.author}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5"
              >
                <p className="text-sm leading-7 text-[var(--foreground)]">"{item.quote}"</p>
                <p className="mt-4 text-sm font-semibold text-[var(--foreground)]">
                  {item.author}
                </p>
                <p className="text-xs uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
                  {item.role}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-14 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold sm:text-3xl">Explore Our Expertise</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {experts.map((expert, idx) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
              >
                <Link
                  href={`/agent/${expert.id}`}
                  className="group block w-full rounded-xl border border-white/15 bg-white/5 p-4 transition hover:-translate-y-1 hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={expert.image}
                      alt={expert.name}
                      width={88}
                      height={88}
                      className="h-14 w-14 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">{expert.name}</p>
                      <p className="text-xs uppercase tracking-[0.1em] text-slate-300">
                        {expert.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-white">
                    {expert.expertiseTitle}
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    {expert.expertiseSummary}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-3xl font-bold leading-tight text-[var(--foreground)] sm:text-4xl">
                Frequent Asked Questions
              </h2>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4">
              {aboutFaq.map((faq, idx) => (
                <details
                  key={faq.question}
                  className="group border-b border-[var(--border)] py-4 last:border-b-0"
                  open={idx === 0}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
                    <span className="text-sm font-semibold text-[var(--foreground)]">
                      {faq.question}
                    </span>
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[var(--border)] text-[var(--muted-foreground)] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80"
              alt="Call to action real estate"
              width={1600}
              height={900}
              className="h-64 w-full object-cover sm:h-80"
            />
            <div className="absolute inset-0 bg-slate-950/50" />
            <div className="absolute inset-0 flex flex-col items-start justify-end p-6 sm:p-10">
              <p className="text-sm uppercase tracking-[0.14em] text-slate-200">
                Newsletter to get updated the latest news
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                Say Hello to Brighter Days Together
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button>Let's Talk</Button>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="border-white/50 bg-black/25 text-white hover:bg-black/40"
                  >
                    Back Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
