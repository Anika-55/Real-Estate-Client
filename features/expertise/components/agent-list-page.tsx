import { ExpertiseCard } from "@/features/expertise/components/expertise-card";
import { experts } from "@/features/expertise/data/experts-data";

export function AgentListPage() {
  return (
    <main className="bg-[var(--background)] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
          Our Team
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[var(--foreground)] sm:text-4xl">
          Meet Our Expert Agents
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted-foreground)]">
          Explore our experienced specialists and open any profile to see detailed
          contact information, work history, and consultation options.
        </p>

        <section className="mt-8 rounded-2xl bg-slate-950 p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {experts.map((expert) => (
              <ExpertiseCard key={expert.id} expert={expert} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
