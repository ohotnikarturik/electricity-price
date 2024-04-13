import { Prices } from "nordpool"

const prices = new Prices()

export async function GET() {
  const hourlyPrices = await prices.hourly({ area: "FI" })
  return Response.json(hourlyPrices)
}
