"use server"

import { Prices } from "nordpool"

interface HourlyPrice {
  date: string
  value: number
  area: string
}

const prices = new Prices()

export const getHourlyPrices = async () => {
  let hourlyPrices: HourlyPrice[] = []
  try {
    const results = await prices.hourly({
      area: "FI",
      // currency: "EUR",
      // date: "2024-03-21T21:47:54.912Z",
    })
    hourlyPrices = results || []
  } catch (error) {
    console.log("error", error)
  }

  return hourlyPrices
}
