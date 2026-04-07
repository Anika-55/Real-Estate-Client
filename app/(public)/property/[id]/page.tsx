import { notFound } from "next/navigation";
import { PropertyDetailsPage } from "@/features/properties/components/property-details-page";
import {
  getPropertyById,
  properties,
} from "@/features/properties/data/properties";

type PropertyDetailsRouteProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return properties.map((property) => ({ id: property.id }));
}

export default async function PropertyDetailsRoute({
  params,
}: PropertyDetailsRouteProps) {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  return <PropertyDetailsPage property={property} />;
}
