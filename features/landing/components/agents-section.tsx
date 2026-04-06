"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { agents } from "@/features/landing/data/landing-data";
import { SectionHeading } from "@/features/landing/components/section-heading";

export function AgentsSection() {
  return (
    <section className="bg-slate-950 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Agents"
          title="Meet the people behind your next move"
          description="A trusted team combining local insight with negotiation expertise."
          tone="light"
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
            >
              <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur">
                <div className="h-56">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    width={800}
                    height={800}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent>
                  <h3 className="text-base font-semibold text-white">{agent.name}</h3>
                  <p className="mt-1 text-sm text-slate-300">{agent.role}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
