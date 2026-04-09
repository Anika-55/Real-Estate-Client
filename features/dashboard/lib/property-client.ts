import { authApiRequest } from "@/features/auth/lib/auth-client";

interface PropertyOwner {
  id: string;
  name: string;
  email: string;
  phone: string | null;
}

export interface PropertyListItem {
  id: string;
  title: string;
  description: string;
  price: string;
  type: "RENT" | "SALE";
  city: string;
  country: string;
  address: string;
  images: string[];
  bedrooms: number | null;
  bathrooms: number | null;
  area: number | null;
  ownerId: string;
  owner: PropertyOwner;
  createdAt: string;
  updatedAt: string;
}

export interface FavoriteListItem {
  id: string;
  propertyId: string;
  createdAt: string;
  property: PropertyListItem;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface PaginatedList<T> {
  data: T[];
  pagination: PaginationMeta;
}

interface CreatePropertyInput {
  title: string;
  description: string;
  price: string;
  type: "RENT" | "SALE";
  city: string;
  country: string;
  address: string;
  bedrooms?: string;
  bathrooms?: string;
  area?: string;
  images: File[];
}

export async function createPropertyListing(input: CreatePropertyInput) {
  const formData = new FormData();
  formData.append("title", input.title.trim());
  formData.append("description", input.description.trim());
  formData.append("price", input.price.trim());
  formData.append("type", input.type);
  formData.append("city", input.city.trim());
  formData.append("country", input.country.trim());
  formData.append("address", input.address.trim());

  if (input.bedrooms?.trim()) {
    formData.append("bedrooms", input.bedrooms.trim());
  }
  if (input.bathrooms?.trim()) {
    formData.append("bathrooms", input.bathrooms.trim());
  }
  if (input.area?.trim()) {
    formData.append("area", input.area.trim());
  }

  input.images.forEach((file) => formData.append("images", file));

  return authApiRequest<unknown>("/properties", {
    method: "POST",
    body: formData,
  });
}

export async function fetchMyProperties(page = 1, limit = 5) {
  const payload = await authApiRequest<PaginatedList<PropertyListItem>>(
    `/properties/mine?page=${page}&limit=${limit}`,
    { method: "GET" }
  );

  return (
    payload ?? {
      data: [],
      pagination: {
        total: 0,
        page,
        limit,
        totalPages: 1,
        hasNextPage: false,
      },
    }
  );
}

export async function fetchMyFavorites(page = 1, limit = 9) {
  const payload = await authApiRequest<PaginatedList<FavoriteListItem>>(
    `/user/favorites?page=${page}&limit=${limit}`,
    { method: "GET" }
  );

  return (
    payload ?? {
      data: [],
      pagination: {
        total: 0,
        page,
        limit,
        totalPages: 1,
        hasNextPage: false,
      },
    }
  );
}
