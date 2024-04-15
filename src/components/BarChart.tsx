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

import { HourlyPrice } from "@/types"
import { formatPrice } from "@/utils"
import { useTheme } from "@mui/material"

interface Props {
  data: HourlyPrice[]
}

const BarChart = ({ data }: Props) => {
  const theme = useTheme()
  const isXsSm = useMediaQuery(theme.breakpoints.between("xs", "sm"))
  const isSmMd = useMediaQuery(theme.breakpoints.between("sm", "md"))

  const adjustedData = useMemo(
    () =>
      data.map((item) => {
        const isCurrentHour = isSameHour(item.date, new Date())
        return {
          date: format(item.date, "HH"),
          price: Number(formatPrice(item.value)),
          fill: isCurrentHour ? "#ffb74d" : "#8884d8",
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
        data={adjustedData}
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
        <Tooltip />
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
