import { PropertyListPage } from "@/features/properties/components/property-list-page";
import { fetchPublicProperties } from "@/features/properties/lib/public-property-client";

export default async function PropertyPage() {
  const properties = await fetchPublicProperties();
  return <PropertyListPage properties={properties} />;
}
