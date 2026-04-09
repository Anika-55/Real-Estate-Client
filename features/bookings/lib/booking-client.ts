import { appConfig } from "@/lib/config";

type BookingStatus = "PENDING" | "CONFIRMED";

export interface BookingListItem {
  id: string;
  userId: string;
  propertyId: string;
  date: string;
  status: BookingStatus;
  createdAt: string;
  property: {
    id: string;
    title: string;
    city: string;
    country: string;
    address: string;
    price: string;
    type: "RENT" | "SALE";
    images: string[];
  };
}

interface ApiEnvelope<T> {
  message?: string;
  data?: T;
}

function getAuthToken(): string {
  const token = localStorage.getItem("realestate_access_token");
  if (!token) {
    throw new Error("Session expired. Please login again.");
  }
  return token;
}

function toApiUrl(path: string): string {
  return `${appConfig.publicApiBaseUrl.replace(/\/+$/, "")}${path}`;
}

export async function createBooking(input: { propertyId: string; date: string }) {
  const token = getAuthToken();

  const response = await fetch(toApiUrl("/bookings"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
    credentials: "include",
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => null)) as
    | ApiEnvelope<BookingListItem>
    | null;

  if (!response.ok || !payload?.data) {
    const message =
      payload?.message && typeof payload.message === "string"
        ? payload.message
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload.data;
}

export async function fetchMyBookings() {
  const token = getAuthToken();

  const response = await fetch(toApiUrl("/bookings/me"), {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
    credentials: "include",
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => null)) as
    | ApiEnvelope<BookingListItem[]>
    | null;

  if (!response.ok) {
    const message =
      payload?.message && typeof payload.message === "string"
        ? payload.message
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload?.data ?? [];
}

export async function cancelBookingById(bookingId: string) {
  const token = getAuthToken();

  const response = await fetch(toApiUrl(`/bookings/${bookingId}`), {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
    credentials: "include",
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => null)) as
    | ApiEnvelope<null>
    | null;

  if (!response.ok) {
    const message =
      payload?.message && typeof payload.message === "string"
        ? payload.message
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }
}

export async function confirmBookingById(bookingId: string) {
  const token = getAuthToken();

  const response = await fetch(toApiUrl(`/bookings/${bookingId}/confirm`), {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
    },
    credentials: "include",
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => null)) as
    | ApiEnvelope<BookingListItem>
    | null;

  if (!response.ok || !payload?.data) {
    const message =
      payload?.message && typeof payload.message === "string"
        ? payload.message
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload.data;
}
