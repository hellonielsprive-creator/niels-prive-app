export interface Room {
  id: string
  roomName: string
  description: string
  guests: number
  price: number
  bedType: string
  bathrooms: number
  size: string
  image: string

  hotelId: string
  hotelName: string

  createdAt: string
}