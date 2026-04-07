"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { experts, type Expert } from "@/features/expertise/data/experts-data";

type ExpertiseDetailsPageProps = {
  expert: Expert;
};

export function ExpertiseDetailsPage({ expert }: ExpertiseDetailsPageProps) {
  const moreAgents = experts.filter((item) => item.id !== expert.id).slice(0, 3);

  return (
    <main className="bg-[var(--background)] pb-16 pt-10 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
          Home / Agent / Agent Details
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[var(--foreground)] sm:text-4xl">
          About Our Agent
        </h1>

        <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="overflow-hidden rounded-xl bg-[var(--muted)]">
              <Image
                src={expert.image}
                alt={expert.name}
                width={900}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                Hello, I'm
              </p>
              <h2 className="mt-1 text-2xl font-bold text-[var(--foreground)]">
                {expert.name}
              </h2>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">{expert.role}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <InfoRow label="Department" value={expert.department} />
                <InfoRow label="Position" value={expert.position} />
                <InfoRow label="Experience" value={expert.experience} />
                <InfoRow label="Email" value={expert.email} />
                <InfoRow label="Languages Spoken" value={expert.languages} />
                <InfoRow label="Office Address" value={expert.officeAddress} />
                <InfoRow label="Office Hours" value={expert.officeHours} />
                <InfoRow label="MLS Number" value={expert.mlsNumber} />
              </div>

              <div className="mt-5 rounded-lg border border-[var(--border)] bg-[var(--muted)] p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                  About Me
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--foreground)]">
                  {expert.bio}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <Card>
            <CardContent className="p-5 sm:p-6">
              <h2 className="text-2xl font-semibold text-[var(--foreground)]">
                Contact Me
              </h2>
              <form className="mt-4 grid gap-3 sm:grid-cols-2">
                <Input placeholder="Enter your name" label="Name" />
                <Input placeholder="Enter your phone number" label="Phone" />
                <Input placeholder="Enter your email" label="Email" />
                <Input placeholder="Enter your subject" label="Subject" />
                <div className="sm:col-span-2">
                  <label className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
                    Message
                  </label>
                  <textarea
                    placeholder="Write your message"
                    className="mt-1 h-28 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit">Submit Now</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>

        <section className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-[var(--foreground)]">
              More of Our Agents
            </h2>
            <Link href="/about">
              <Button variant="outline">Explore All Agents</Button>
            </Link>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {moreAgents.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={700}
                  height={550}
                  className="h-44 w-full rounded-lg object-cover"
                />
                <p className="mt-3 text-sm font-semibold text-[var(--foreground)]">
                  {item.name}
                </p>
                <p className="text-xs uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
                  {item.role}
                </p>
                <Link href={`/agent/${item.id}`} className="mt-3 inline-block">
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80"
            alt="Modern luxury house"
            width={1600}
            height={900}
            className="h-64 w-full object-cover sm:h-80"
          />
        </section>
      </div>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2">
      <p className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">{value}</p>
    </div>
  );
}

function Input({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
        {label}
      </label>
      <input
        placeholder={placeholder}
        className="mt-1 h-11 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
      />
    </div>
  );
}
