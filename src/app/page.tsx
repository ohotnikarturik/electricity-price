"use client"

import Box from "@mui/material/Box"
import { Card, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import CircularProgress from "@mui/material/CircularProgress"

import Table from "@/components/Table"
import BarChart from "@/components/BarChart"
import { HourlyPrice } from "@/types"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [hourlyPrices, setHourlyPrices] = useState<HourlyPrice[]>([])

  const getHourlyPrices = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/")
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
        my: 4,
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
