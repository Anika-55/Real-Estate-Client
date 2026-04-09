"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createBooking } from "@/features/bookings/lib/booking-client";

function tomorrowDateValue(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

type BookSiteVisitCardProps = {
  propertyId: string;
};

export function BookSiteVisitCard({ propertyId }: BookSiteVisitCardProps) {
  const [bookingDate, setBookingDate] = useState(tomorrowDateValue);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const handleBook = async () => {
    if (!bookingDate) {
      toast.error("Please select a visit date.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createBooking({ propertyId, date: new Date(bookingDate).toISOString() });
      toast.success("Site visit booking created successfully.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create booking";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-3">
      <label
        htmlFor="booking-date"
        className="text-xs uppercase tracking-[0.12em] text-[var(--muted-foreground)]"
      >
        Visit Date
      </label>
      <input
        id="booking-date"
        type="date"
        min={minDate}
        value={bookingDate}
        onChange={(event) => setBookingDate(event.target.value)}
        className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
      />
      <Button className="w-full" onClick={handleBook} disabled={isSubmitting}>
        {isSubmitting ? "Booking..." : "Book Site Visit"}
      </Button>
    </div>
  );
}
