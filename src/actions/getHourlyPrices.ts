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
    const results = await prices.hourly({ area: "FI" })
    hourlyPrices = results || []
  } catch (error) {
    console.log("error", error)
  }

  return hourlyPrices
}
