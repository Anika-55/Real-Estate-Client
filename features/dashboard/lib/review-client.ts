import { authApiRequest } from "@/features/auth/lib/auth-client";

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
  const payload = await authApiRequest<PaginatedList<DashboardReviewItem>>(
    `/user/reviews?page=${page}&limit=${limit}`,
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
