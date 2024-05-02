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
  const hourlyPrices = (await prices.hourly({ area: "FI", date: today })) || []
  const currentHourPrice = hourlyPrices.find(({ date }) =>
    isSameHour(date, today)
  )
  const priceValues = hourlyPrices.map(({ value }) => value)
  const maxPrice = Math.max(...priceValues)
  const minPrice = Math.min(...priceValues)
  const avgPrice =
    priceValues.reduce((acc, price) => acc + price, 0) / priceValues.length

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
      {hourlyPrices.length > 0 ? (
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
            <Card
              sx={{
                flex: 1,
                minWidth: "160px",
                p: 1,
                backgroundColor: "#ffb74d",
              }}
            >
              <Typography>Current Price</Typography>
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                {formatPrice(currentHourPrice?.value || 0)} snt/kWh
              </Typography>
            </Card>
            <Card
              sx={{
                flex: 1,
                minWidth: "160px",
                p: 1,
                backgroundColor: "#f44336",
                color: "white",
              }}
            >
              <Typography>Highest Price</Typography>
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                {formatPrice(maxPrice || 0)} snt/kWh
              </Typography>
            </Card>
            <Card
              sx={{
                flex: 1,
                minWidth: "160px",
                p: 1,
                backgroundColor: "#29b6f6",
                color: "white",
              }}
            >
              <Typography>Average Price</Typography>
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                {formatPrice(avgPrice || 0)} snt/kWh
              </Typography>
            </Card>
            <Card
              sx={{
                flex: 1,
                minWidth: "160px",
                p: 1,
                backgroundColor: "#66bb6a",
                color: "white",
              }}
            >
              <Typography>Lowest Price</Typography>
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                {formatPrice(minPrice || 0)} snt/kWh
              </Typography>
            </Card>
          </Box>
          <Card sx={{ width: "100%" }}>
            <BarChart hourlyPrices={hourlyPrices} />
          </Card>
          <Table rows={hourlyPrices} />
        </>
      ) : (
        <Typography variant="body2">There is no data at the moment</Typography>
      )}
    </Box>
  )
}
