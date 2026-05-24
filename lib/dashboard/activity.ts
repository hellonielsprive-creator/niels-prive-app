type ActivityBooking = {
  id: string;
  createdAt?: { seconds?: number };
};

export function selectLatestActivities<T extends ActivityBooking>(
  bookings: T[],
  limit = 6
) {
  return [...bookings]
    .sort(
      (a, b) =>
        (b.createdAt?.seconds || 0) -
        (a.createdAt?.seconds || 0)
    )
    .slice(0, limit);
}
