export const BOOKING_TYPES = {
  HOTEL: "hotel",
  ROOM: "room",
  FLIGHT: "flight",
} as const;

export type BookingType =
  (typeof BOOKING_TYPES)[keyof typeof BOOKING_TYPES];

export type BookingWriteInput = Record<
  string,
  unknown
> & {
  partnerId?: string;
  bookingType?: BookingType | string;
  checkIn?: string;
  checkOut?: string;
  status?: string;
  createdAt?: unknown;
};

export function buildBookingRecord(
  input: BookingWriteInput
) {
  const {
    partnerId,
    bookingType,
    checkIn,
    checkOut,
    status,
    createdAt,
    ...rest
  } = input;

  return {
    ...rest,
    ...(partnerId !== undefined &&
    partnerId !== null &&
    partnerId !== ""
      ? { partnerId }
      : {}),
    bookingType:
      bookingType ?? BOOKING_TYPES.HOTEL,
    checkIn: checkIn ?? "",
    checkOut: checkOut ?? "",
    status: status ?? "confirmed",
    createdAt: createdAt ?? new Date(),
  };
}

export function getBookingCreatedAtMs(
  value: unknown
) {
  if (
    value &&
    typeof value === "object" &&
    "seconds" in value &&
    typeof (value as { seconds: unknown })
      .seconds === "number"
  ) {
    return (value as { seconds: number })
      .seconds;
  }

  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    const parsed = new Date(value).getTime();
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  return 0;
}

export function sortBookingsByCreatedAt<
  T extends Record<string, unknown>,
>(bookings: T[]) {
  return [...bookings].sort(
    (a, b) =>
      getBookingCreatedAtMs(b.createdAt) -
      getBookingCreatedAtMs(a.createdAt)
  );
}
