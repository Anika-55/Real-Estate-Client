import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { PropertyDetail } from "@/features/properties/types/property";

type PropertyCardProps = {
  property: PropertyDetail;
};

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/property/${property.id}`} className="group block">
      <Card className="overflow-hidden transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
        <div className="h-56 w-full">
          <Image
            src={property.heroImage}
            alt={property.title}
            width={1200}
            height={800}
            className="h-full w-full object-cover"
          />
        </div>
        <CardContent>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--primary)]">
            {property.location}
          </p>
          <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-[var(--foreground)]">
            {property.title}
          </h3>
          <p className="mt-3 text-xl font-bold text-[var(--foreground)]">
            {property.price}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
