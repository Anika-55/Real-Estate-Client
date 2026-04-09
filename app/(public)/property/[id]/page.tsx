import { notFound } from "next/navigation";
import { PropertyDetailsPage } from "@/features/properties/components/property-details-page";
import { fetchPublicPropertyById } from "@/features/properties/lib/public-property-client";

type PropertyDetailsRouteProps = {
  params: Promise<{ id: string }>;
};

export default async function PropertyDetailsRoute({
  params,
}: PropertyDetailsRouteProps) {
  const { id } = await params;
  const property = await fetchPublicPropertyById(id);

  if (!property) {
    notFound();
  }

  return <PropertyDetailsPage property={property} />;
}
