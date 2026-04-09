import { appConfig } from "@/lib/config";
import { apiClient } from "@/lib/api-client";
import type { PropertyDetail, PropertySummary } from "@/features/properties/types/property";

type PropertyApiItem = {
  id: string;
  title: string;
  description: string;
  price: string | number;
  type: "RENT" | "SALE";
  city: string;
  country: string;
  address: string;
  images: string[];
  bedrooms: number | null;
  bathrooms: number | null;
  area: number | null;
  createdAt: string;
  updatedAt: string;
};

type PaginatedProperties = {
  data: PropertyApiItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
  };
};

const fallbackImage =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";

const defaultFaqs = [
  {
    question: "Can I schedule a property visit?",
    answer:
      "Yes. You can contact our team from the detail page and pick your preferred time slot.",
  },
  {
    question: "Is financing support available?",
    answer:
      "Yes, we can connect you with partner financial institutions for mortgage guidance.",
  },
  {
    question: "Are property documents verified?",
    answer:
      "Listings are reviewed before publication. Full documentation can be shared during the process.",
  },
];

function formatPrice(value: string | number): string {
  const numericValue =
    typeof value === "number" ? value : Number.parseFloat(value);

  if (!Number.isFinite(numericValue)) {
    return String(value);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(numericValue);
}

function normalizeImages(images: string[]): string[] {
  if (!images.length) {
    return [fallbackImage];
  }

  const validImages = images.filter(
    (image) => typeof image === "string" && image.trim().length > 0
  );

  return validImages.length ? validImages : [fallbackImage];
}

export function mapPropertySummary(item: PropertyApiItem): PropertySummary {
  const gallery = normalizeImages(item.images);
  return {
    id: item.id,
    title: item.title,
    location: `${item.city}, ${item.country}`,
    price: formatPrice(item.price),
    heroImage: gallery[0],
  };
}

export function mapPropertyDetail(item: PropertyApiItem): PropertyDetail {
  const gallery = normalizeImages(item.images);
  const heroImage = gallery[0];
  const displayGallery = gallery.length >= 3 ? gallery.slice(0, 3) : [heroImage, ...gallery].slice(0, 3);
  const areaText = item.area ? `${item.area} Sq Ft` : "N/A";

  return {
    id: item.id,
    title: item.title,
    location: `${item.city}, ${item.country}`,
    price: formatPrice(item.price),
    heroImage,
    gallery: displayGallery,
    description: item.description,
    youtubeEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    address: {
      area: item.address,
      city: item.city,
      country: item.country,
      zipCode: "N/A",
    },
    details: [
      { label: "Property ID", value: item.id },
      { label: "Property Type", value: item.type === "RENT" ? "For Rent" : "For Sale" },
      { label: "Bedrooms", value: item.bedrooms ? String(item.bedrooms) : "N/A" },
      { label: "Bathrooms", value: item.bathrooms ? String(item.bathrooms) : "N/A" },
      { label: "Built Area", value: areaText },
    ],
    features: [
      item.type === "RENT" ? "Flexible Rental Terms" : "Ownership Ready",
      item.bedrooms && item.bedrooms >= 3 ? "Family Friendly Layout" : "Smart Space Plan",
      item.area && item.area >= 1500 ? "Spacious Floor Plan" : "Efficient Floor Plan",
      "Verified Listing",
      "Prime Location Access",
      "Professional Support",
    ],
    faqs: defaultFaqs,
  };
}

export async function fetchPublicProperties(): Promise<PropertySummary[]> {
  const response = await apiClient<PaginatedProperties>("/properties", {
    method: "GET",
    baseUrl: appConfig.serverApiBaseUrl,
  });

  const properties = response.data?.data ?? [];
  return properties.map(mapPropertySummary);
}

export async function fetchPublicPropertyById(
  id: string
): Promise<PropertyDetail | null> {
  try {
    const response = await apiClient<PropertyApiItem>(`/properties/${id}`, {
      method: "GET",
      baseUrl: appConfig.serverApiBaseUrl,
    });

    return mapPropertyDetail(response.data);
  } catch {
    return null;
  }
}
