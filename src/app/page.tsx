"use client"

import Box from "@mui/material/Box"
import { Card, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import CircularProgress from "@mui/material/CircularProgress"

import Table from "@/components/Table"
import BarChart from "@/components/BarChart"
import { HourlyPrice } from "@/types"
import { format, isSameHour } from "date-fns"
import { formatPrice } from "@/utils"
import DigitalClock from "@/components/DigitalClock"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [hourlyPrices, setHourlyPrices] = useState<HourlyPrice[]>([])
  const currentDay = new Date()
  const currentPrice = hourlyPrices.find(({ date }) =>
    isSameHour(date, currentDay)
  )
  const arrayOfPrices = hourlyPrices.map(({ value }) => value)
  const highestPrice = Math.max(...arrayOfPrices)
  const lowestPrice = Math.min(...arrayOfPrices)
  const averagePrice =
    arrayOfPrices.reduce((acc, price) => acc + price, 0) / arrayOfPrices.length

  const getHourlyPrices = async () => {
    try {
      const res = await fetch("/api/", { cache: "no-store" })
      const prises = await res.json()
      setHourlyPrices(prises)
    } catch (error) {
      console.log("error", error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getHourlyPrices()
  }, [])

  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : hourlyPrices.length > 0 ? (
        <>
          <Box sx={{ display: "flex" }}>
            <Typography>{format(currentDay, "dd.MM.yyyy")}</Typography>
            <Typography px={1}>|</Typography>
            <DigitalClock />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Card sx={{ flex: 1, minWidth: "160px", p: 2 }}>
              <Typography>Current Price</Typography>
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                {formatPrice(currentPrice?.value || 0)} snt/kWh
              </Typography>
            </Card>
            <Card sx={{ flex: 1, minWidth: "160px", p: 2 }}>
              <Typography>Highest Price</Typography>
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                {formatPrice(highestPrice || 0)} snt/kWh
              </Typography>
            </Card>
            <Card sx={{ flex: 1, minWidth: "160px", p: 2 }}>
              <Typography>Average Price</Typography>
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                {formatPrice(averagePrice || 0)} snt/kWh
              </Typography>
            </Card>
            <Card sx={{ flex: 1, minWidth: "160px", p: 2 }}>
              <Typography>Lowest Price</Typography>
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                {formatPrice(lowestPrice || 0)} snt/kWh
              </Typography>
            </Card>
          </Box>
          <Card sx={{ width: "100%" }}>
            <BarChart data={hourlyPrices} />
          </Card>
          <Table rows={hourlyPrices} />
        </>
      ) : (
        <Typography variant="body2">Try later, please</Typography>
      )}
    </Box>
  )
}
