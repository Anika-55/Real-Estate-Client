import { authApiRequest } from "@/features/auth/lib/auth-client";

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

export async function createBooking(input: { propertyId: string; date: string }) {
  return authApiRequest<BookingListItem>("/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
}

export async function fetchMyBookings() {
  return authApiRequest<BookingListItem[]>("/bookings/me", {
    method: "GET",
  });
}

export async function cancelBookingById(bookingId: string) {
  await authApiRequest<null>(`/bookings/${bookingId}`, {
    method: "DELETE",
  });
}

export async function confirmBookingById(bookingId: string) {
  return authApiRequest<BookingListItem>(`/bookings/${bookingId}/confirm`, {
    method: "PATCH",
  });
}
