export function getArrivalsToday(
  bookings: Array<{
    checkIn?: string;
    status?: string;
  }>,
  today: Date = new Date()
) {
  return bookings.filter((booking) => {
    if (!booking.checkIn) return false;

    const checkIn = new Date(booking.checkIn);

    return (
      checkIn.toDateString() === today.toDateString() &&
      booking.status !== "cancelled"
    );
  });
}

export function getDeparturesToday(
  bookings: Array<{
    checkOut?: string;
    status?: string;
  }>,
  today: Date = new Date()
) {
  return bookings.filter((booking) => {
    if (!booking.checkOut) return false;

    const checkOut = new Date(booking.checkOut);

    return (
      checkOut.toDateString() === today.toDateString() &&
      booking.status === "checked-in"
    );
  });
}

export function getOccupiedRooms(
  bookings: Array<{
    checkIn?: string;
    checkOut?: string;
    status?: string;
  }>,
  today: Date = new Date()
) {
  return bookings.filter((booking) => {
    if (!booking.checkIn || !booking.checkOut) return false;

    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);

    return (
      booking.status === "checked-in" &&
      today >= checkIn &&
      today <= checkOut
    );
  });
}

export function getCleaningQueueCount(
  departuresToday: unknown[]
) {
  return departuresToday.length;
}
