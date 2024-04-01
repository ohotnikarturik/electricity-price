"use client"

import MuiTable from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { format, isSameHour } from "date-fns"

const formatPrice = (value: number) => {
  // convert it to snt/kWh and add Finnish VAT of 24 %
  const price = Math.round(value * 1.24 * 100) / 1000
  return price.toFixed(3)
}

interface HourlyPrice {
  date: string
  value: number
  area: string
}

interface Props {
  rows: HourlyPrice[]
}

export default function Table({ rows }: Props) {
  const renderRows = () => {
    return rows.map((row, i) => {
      const isCurrent = isSameHour(row.date, new Date())

      return (
        <TableRow
          key={i}
          sx={{
            "&:last-child td, &:last-child th": {
              border: 0,
            },
          }}
          selected={isCurrent}
        >
          <TableCell component="th" scope="row">
            {format(row.date, "dd.MM")}
          </TableCell>
          <TableCell align="right">{format(row.date, "HH:mm")}</TableCell>
          <TableCell align="right">{formatPrice(row.value)}</TableCell>
        </TableRow>
      )
    })
  }
  return (
    <TableContainer component={Paper}>
      <MuiTable aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Price (snt/kWh)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderRows()}</TableBody>
      </MuiTable>
    </TableContainer>
  )
}
