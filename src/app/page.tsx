"use client"

import Box from "@mui/material/Box"
import { Card, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import useSWR from "swr"

import Table from "@/components/Table"
import BarChart from "@/components/BarChart"
import { HourlyPrice } from "@/types"
import { format, isSameHour } from "date-fns"
import { formatPrice } from "@/utils"
import DigitalClock from "@/components/DigitalClock"

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json())

export const dynamic = "force-dynamic"

export default function Home() {
  const { data = [], error, isLoading } = useSWR("/api", fetcher)
  const hourlyPrices: HourlyPrice[] = data
  const currentDay = new Date()
  const currentPrice = hourlyPrices.find(({ date }) =>
    isSameHour(date, currentDay)
  )
  const arrayOfPrices = hourlyPrices.map(({ value }) => value)
  const highestPrice = Math.max(...arrayOfPrices)
  const lowestPrice = Math.min(...arrayOfPrices)
  const averagePrice =
    arrayOfPrices.reduce((acc, price) => acc + price, 0) / arrayOfPrices.length

  if (error) {
    console.log("error", error)
    return (
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        There is some Error. Please, try later
      </Typography>
    )
  }

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
            <Card sx={{ flex: 1, minWidth: "160px", p: 1 }}>
              <Typography>Current Price</Typography>
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                {formatPrice(currentPrice?.value || 0)} snt/kWh
              </Typography>
            </Card>
            <Card sx={{ flex: 1, minWidth: "160px", p: 1 }}>
              <Typography>Highest Price</Typography>
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                {formatPrice(highestPrice || 0)} snt/kWh
              </Typography>
            </Card>
            <Card sx={{ flex: 1, minWidth: "160px", p: 1 }}>
              <Typography>Average Price</Typography>
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                {formatPrice(averagePrice || 0)} snt/kWh
              </Typography>
            </Card>
            <Card sx={{ flex: 1, minWidth: "160px", p: 1 }}>
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
        <Typography variant="body2">There is no data at the moment</Typography>
      )}
    </Box>
  )
}
