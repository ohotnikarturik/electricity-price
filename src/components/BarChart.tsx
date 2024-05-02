"use client"

import {
  ResponsiveContainer,
  BarChart as Chart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useMemo } from "react"
import { format, isSameHour } from "date-fns"
import { Card, Typography, useTheme } from "@mui/material"

import { HourlyPrice } from "@/types"
import { formatPrice } from "@/utils"

interface Props {
  hourlyPrices: HourlyPrice[]
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: any[]
  label?: string
}) => {
  if (active && payload && payload.length) {
    return (
      <Card sx={{ p: 1 }}>
        <Typography variant="body2">{`Time: ${label}`}</Typography>
        <Typography variant="body2">{`Price: ${
          payload.at(0).value
        } snt/kWh`}</Typography>
      </Card>
    )
  }

  return null
}

const BarChart = ({ hourlyPrices }: Props) => {
  const theme = useTheme()
  const isXsSm = useMediaQuery(theme.breakpoints.between("xs", "sm"))
  const isSmMd = useMediaQuery(theme.breakpoints.between("sm", "md"))

  const formattedHourlyPrices = useMemo(
    () =>
      hourlyPrices.map((hourlyPrice) => {
        const isCurrentHourPrice = isSameHour(hourlyPrice.date, new Date())
        return {
          date: format(hourlyPrice.date, "HH:mm"),
          price: Number(formatPrice(hourlyPrice.value)),
          fill: isCurrentHourPrice ? "#ffb74d" : "#8884d8",
        }
      }),
    []
  )

  return (
    <ResponsiveContainer
      width="100%"
      height={isXsSm ? 200 : isSmMd ? 280 : 380}
    >
      <Chart
        data={formattedHourlyPrices}
        margin={{
          top: 20,
          right: 20,
          left: -25,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis tickCount={6} tick={{ fontSize: 12 }} allowDecimals={false} />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="price"
          label={{
            position: "top",
            fontWeight: "bold",
            fontSize: isXsSm ? 5 : isSmMd ? 7 : 9,
            ...(isXsSm && { angle: -90, offset: 12 }),
          }}
        />
      </Chart>
    </ResponsiveContainer>
  )
}
export default BarChart
