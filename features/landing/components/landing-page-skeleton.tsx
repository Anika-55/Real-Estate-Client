import { Skeleton } from "@/components/ui/skeleton";

export function LandingPageSkeleton() {
  return (
    <main className="bg-[var(--background)]">
      <section className="relative min-h-[90vh] overflow-hidden bg-slate-900">
        <div className="absolute inset-0" />
        <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-end px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <div className="w-full max-w-2xl space-y-4">
            <Skeleton className="h-6 w-40 rounded-full bg-white/20" />
            <Skeleton className="h-14 w-full bg-white/20" />
            <Skeleton className="h-14 w-5/6 bg-white/20" />
            <Skeleton className="h-5 w-3/4 bg-white/20" />
            <div className="flex gap-3 pt-2">
              <Skeleton className="h-12 w-44 bg-white/20" />
              <Skeleton className="h-12 w-56 bg-white/20" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="h-28 rounded-2xl" />
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl space-y-3 text-center">
            <Skeleton className="mx-auto h-4 w-28" />
            <Skeleton className="mx-auto h-8 w-96 max-w-full" />
            <Skeleton className="mx-auto h-5 w-80 max-w-full" />
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="space-y-3 rounded-2xl">
                <Skeleton className="h-56 w-full rounded-2xl" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
