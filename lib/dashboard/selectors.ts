type NamedRecord = {
  id: string;
  roomName?: string;
  archived?: boolean;
  bookingType?: string;
};

export function filterActiveRooms<T extends NamedRecord>(
  rooms: T[]
) {
  return rooms.filter((room) => !room.archived);
}

export function selectHotelBookings<
  T extends { bookingType?: string },
>(bookings: T[]) {
  return bookings.filter(
    (booking) => booking.bookingType === "hotel"
  );
}

export function selectPartnerPmsBookings<
  T extends { bookingType?: string },
>(bookings: T[]) {
  return bookings.filter((booking) => {
    const type = booking.bookingType;

    if (type === "flight") {
      return false;
    }

    return (
      type === "hotel" ||
      type === "room" ||
      type === undefined ||
      type === null ||
      type === ""
    );
  });
}

export function selectRoomScopedBookings<
  R extends { roomName?: string },
  B extends { roomName?: string },
>(rooms: R[], bookings: B[]) {
  const roomNames = new Set(
    rooms
      .map((room) => room.roomName)
      .filter(Boolean)
  );

  return bookings.filter((booking) =>
    roomNames.has(booking.roomName)
  );
}
