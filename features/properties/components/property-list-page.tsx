import { SectionHeading } from "@/features/landing/components/section-heading";
import { PropertyCard } from "@/features/properties/components/property-card";
import type { PropertySummary } from "@/features/properties/types/property";

type PropertyListPageProps = {
  properties: PropertySummary[];
};

export function PropertyListPage({ properties }: PropertyListPageProps) {
  return (
    <main className="bg-[var(--background)] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Property Listing"
          title="Browse curated premium properties"
          description="Explore verified listings and open any property to see full details, media, and FAQs."
        />
        {properties.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 text-center text-sm text-[var(--muted-foreground)]">
            No properties available right now. Please check back shortly.
          </div>
        )}
      </div>
    </main>
  );
}
