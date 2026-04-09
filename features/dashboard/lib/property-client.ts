import { appConfig } from "@/lib/config";

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

interface ApiEnvelope<T> {
  message?: string;
  data?: T;
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
  const token = localStorage.getItem("realestate_access_token");
  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

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

  const response = await fetch(
    `${appConfig.publicApiBaseUrl.replace(/\/+$/, "")}/properties`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: formData,
      credentials: "include",
      cache: "no-store",
    }
  );

  const payload = (await response.json().catch(() => null)) as
    | { message?: string }
    | null;

  if (!response.ok) {
    const message =
      payload?.message && typeof payload.message === "string"
        ? payload.message
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

export async function fetchMyProperties(page = 1, limit = 5) {
  const token = localStorage.getItem("realestate_access_token");
  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  const response = await fetch(
    `${appConfig.publicApiBaseUrl.replace(/\/+$/, "")}/properties/mine?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
      credentials: "include",
      cache: "no-store",
    }
  );

  const payload = (await response.json().catch(() => null)) as
    | ApiEnvelope<PaginatedList<PropertyListItem>>
    | null;

  if (!response.ok) {
    const message =
      payload?.message && typeof payload.message === "string"
        ? payload.message
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return (
    payload?.data ?? {
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
  const token = localStorage.getItem("realestate_access_token");
  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  const response = await fetch(
    `${appConfig.publicApiBaseUrl.replace(/\/+$/, "")}/user/favorites?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
      credentials: "include",
      cache: "no-store",
    }
  );

  const payload = (await response.json().catch(() => null)) as
    | ApiEnvelope<PaginatedList<FavoriteListItem>>
    | null;

  if (!response.ok) {
    const message =
      payload?.message && typeof payload.message === "string"
        ? payload.message
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return (
    payload?.data ?? {
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
