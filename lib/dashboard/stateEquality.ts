type WithId = { id: string };

const PARTNER_SYNC_FIELDS = [
  "id",
  "propertyName",
  "propertyType",
  "businessEmail",
  "phoneNumber",
  "address",
  "country",
  "stateRegion",
  "pincode",
  "email",
  "phone",
  "verificationStatus",
] as const;

function partnerFingerprint(
  partner: Record<string, unknown> | null
) {
  if (!partner) return "";

  return PARTNER_SYNC_FIELDS.map((field) =>
    String(partner[field] ?? "")
  ).join("|");
}

function roomsFingerprint(rooms: WithId[]) {
  return [...rooms]
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((room) =>
      [
        room.id,
        (room as { price?: unknown }).price,
        (room as { roomName?: unknown }).roomName,
        (room as { archived?: unknown }).archived,
      ].join(":")
    )
    .join("|");
}

function bookingsFingerprint(bookings: WithId[]) {
  return bookings
    .map((booking) =>
      [
        booking.id,
        (booking as { status?: unknown }).status,
        (booking as { checkIn?: unknown }).checkIn,
        (booking as { checkOut?: unknown }).checkOut,
        (booking as { createdAt?: { seconds?: number } }).createdAt
          ?.seconds,
      ].join(":")
    )
    .join("|");
}

export function isSamePartner(
  current: Record<string, unknown> | null,
  next: Record<string, unknown> | null
) {
  return (
    partnerFingerprint(current) ===
    partnerFingerprint(next)
  );
}

export function isSameRooms(
  current: WithId[],
  next: WithId[]
) {
  return (
    roomsFingerprint(current) ===
    roomsFingerprint(next)
  );
}

export function isSameBookings(
  current: WithId[],
  next: WithId[]
) {
  return (
    bookingsFingerprint(current) ===
    bookingsFingerprint(next)
  );
}
