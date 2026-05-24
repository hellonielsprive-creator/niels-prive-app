export interface Booking {
  id: string

  partnerId?: string
  bookingType?: string

  hotelId?: string
  hotelName?: string

  roomId?: string
  roomName?: string

  guestName?: string
  guestEmail?: string

  checkIn: string
  checkOut: string

  guests?: number | string
  totalPrice?: number | string

  status: string

  createdAt: string | number | { seconds?: number }
}
