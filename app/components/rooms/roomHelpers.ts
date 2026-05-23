export const getRoomStatus = (
  room: any,
  bookings: any[]
) => {

  const checkedInBooking =
    bookings.find(
      (booking: any) => {

        if (
          booking.status !==
          "checked-in"
        ) return false;

        return (
          booking.roomName ===
          room.roomName
        );

      }
    );

  /* PRIORITY 1 */

  if (checkedInBooking) {

    return {
      label: "Occupied",
      styles:
        "bg-green-500/10 text-green-400 border border-green-500/20",
    };

  }

  /* PRIORITY 2 */

  if (
    room.manualStatus ===
    "maintenance"
  ) {

    return {
      label: "Maintenance",
      styles:
        "bg-red-500/10 text-red-400 border border-red-500/20",
    };

  }

  /* PRIORITY 3 */

  if (
    room.manualStatus ===
      "cleaning" ||

    bookings.find(
      (booking: any) =>

        booking.roomName ===
          room.roomName &&
        booking.status ===
          "cleaning"

    )
  ) {

    return {
      label: "Cleaning",
      styles:
        "bg-yellow-500/20 text-yellow-300 border border-yellow-400/40",
    };

  }

  /* DEFAULT */

  return {
    label: "Available",
    styles:
      "bg-[#d4a574]/10 text-[#d4a574] border border-[#d4a574]/20",
  };

};

export const getRoomRevenue = (
  roomName: string,
  bookings: any[]
) => {

  return bookings
    .filter(
      (booking) =>
        booking.roomName ===
        roomName
    )
    .reduce(
      (
        acc,
        booking
      ) =>
        acc +
        Number(
          booking.totalPrice ||
            0
        ),
      0
    );

};

export const getRoomBookings = (
  roomName: string,
  bookings: any[]
) => {

  return bookings.filter(
    (booking) =>
      booking.roomName ===
      roomName
  ).length;

};

export const getRoomOccupancy = (
  roomName: string,
  bookings: any[]
) => {

  const roomBookings =
    getRoomBookings(
      roomName,
      bookings
    );

  return Math.min(
    100,
    roomBookings * 12
  );

};