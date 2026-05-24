export const calculateNights = (
  checkIn: string,
  checkOut: string
) => {
  const start = new Date(checkIn)
  const end = new Date(checkOut)

  const diffTime = end.getTime() - start.getTime()

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export const calculateTotalPrice = (
  pricePerNight: number,
  nights: number
) => {
  return pricePerNight * nights
}