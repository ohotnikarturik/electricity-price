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

import { HourlyPrice } from "@/types"
import { format, isSameHour } from "date-fns"
import { formatPrice } from "@/utils"
import { useMemo } from "react"

interface Props {
  data: HourlyPrice[]
}

const BarChart = ({ data }: Props) => {
  console.log(data)
  const adjustedData = useMemo(
    () =>
      data.map((item) => {
        const isCurrentHour = isSameHour(item.date, new Date())
        return {
          date: format(item.date, "HH"),
          price: formatPrice(item.value),
          fill: isCurrentHour ? "#ffb74d" : "#8884d8",
        }
      }),
    []
  )

  return (
    <ResponsiveContainer width="100%" height={400}>
      <Chart
        data={adjustedData}
        margin={{
          top: 20,
          right: 20,
          left: -10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Bar
          dataKey="price"
          label={{ position: "top", fontSize: 9, fontWeight: "bold" }}
        />
      </Chart>
    </ResponsiveContainer>
  )
}
export default BarChart
