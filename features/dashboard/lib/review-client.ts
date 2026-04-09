import { appConfig } from "@/lib/config";

export interface DashboardReviewItem {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
  property: {
    id: string;
    title: string;
    images: string[];
    city: string;
    country: string;
  };
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

export async function fetchMyReviews(page = 1, limit = 5) {
  const token = localStorage.getItem("realestate_access_token");
  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  const response = await fetch(
    `${appConfig.publicApiBaseUrl.replace(/\/+$/, "")}/user/reviews?page=${page}&limit=${limit}`,
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
    | ApiEnvelope<PaginatedList<DashboardReviewItem>>
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
