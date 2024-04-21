import Box from "@mui/material/Box"
import { Card, Typography } from "@mui/material"
import { Prices } from "nordpool"

import Table from "@/components/Table"
import BarChart from "@/components/BarChart"
// import { HourlyPrice } from "@/types"
import { format, isSameHour } from "date-fns"
import { formatPrice } from "@/utils"
import DigitalClock from "@/components/DigitalClock"

const prices = new Prices()

export default async function Home() {
  const today = new Date()
  // const tomorrow = today
  // tomorrow.setDate(tomorrow.getDate() + 1)

  const hourlyPricesToday =
    (await prices.hourly({ area: "FI", date: today })) || []
  // const hourlyPricesTomorrow =
  //   (await prices.hourly({ area: "FI", date: tomorrow })) || []

  const currentPrice = hourlyPricesToday.find(({ date }) =>
    isSameHour(date, today)
  )
  const arrayOfPrices = hourlyPricesToday.map(({ value }) => value)
  const highestPrice = Math.max(...arrayOfPrices)
  const lowestPrice = Math.min(...arrayOfPrices)
  const averagePrice =
    arrayOfPrices.reduce((acc, price) => acc + price, 0) / arrayOfPrices.length

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
      {hourlyPricesToday.length > 0 ? (
        <>
          <Box sx={{ display: "flex" }}>
            <Typography>{format(today, "dd.MM.yyyy")}</Typography>
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
            <BarChart data={hourlyPricesToday} />
          </Card>
          <Table rows={hourlyPricesToday} />
        </>
      ) : (
        <Typography variant="body2">There is no data at the moment</Typography>
      )}
    </Box>
  )
}
