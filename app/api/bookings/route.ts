import { createBooking } from "@/lib/firestore/bookings";
import { BOOKING_TYPES } from "@/lib/bookings/schema";

const ALLOWED_BOOKING_TYPES = new Set<string>(
  Object.values(BOOKING_TYPES)
);

function normalizeBookingBody(body: unknown) {
  if (!body || typeof body !== "object") {
    throw new Error("Invalid booking payload");
  }

  const payload = body as Record<string, unknown>;
  const bookingType =
    typeof payload.bookingType === "string" &&
    ALLOWED_BOOKING_TYPES.has(payload.bookingType)
      ? payload.bookingType
      : BOOKING_TYPES.HOTEL;
  const status =
    typeof payload.status === "string" &&
    payload.status.length > 0
      ? payload.status
      : "confirmed";
  const checkIn =
    typeof payload.checkIn === "string"
      ? payload.checkIn
      : "";
  const checkOut =
    typeof payload.checkOut === "string"
      ? payload.checkOut
      : "";

  return {
    ...payload,
    bookingType,
    status,
    checkIn,
    checkOut,
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const payload = normalizeBookingBody(body);

    const bookingId = await createBooking(payload);

    return Response.json({
      success: true,
      bookingId,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Booking failed";

    console.log(error);

    return Response.json({
      success: false,
      error: message,
    });
  }
}
