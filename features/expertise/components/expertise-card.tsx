"use client";

import Image from "next/image";
import type { Expert } from "@/features/expertise/data/experts-data";

type ExpertiseCardProps = {
  expert: Expert;
};

export function ExpertiseCard({ expert }: ExpertiseCardProps) {
  return (
    <article className="group relative block w-full rounded-xl border border-white/15 bg-white/5 p-4 transition hover:-translate-y-1 hover:bg-white/10">
      <a
        href={`/agent/${expert.id}`}
        aria-label={`View details for ${expert.name}`}
        className="absolute inset-0 z-10 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      />
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
      <p className="mt-3 text-sm font-semibold text-white">{expert.expertiseTitle}</p>
      <p className="mt-1 text-xs text-slate-300">{expert.expertiseSummary}</p>
    </article>
  );
}
