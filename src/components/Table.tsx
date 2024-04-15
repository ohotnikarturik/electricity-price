"use client"

import MuiTable from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { format, isSameHour } from "date-fns"

import { HourlyPrice } from "@/types"
import { formatPrice } from "@/utils"

interface Props {
  rows: HourlyPrice[]
}

export default function Table({ rows }: Props) {
  const renderRows = () => {
    return rows.map((row, i) => {
      const isCurrent = isSameHour(row.date, new Date())
      const date =
        i === 0 || i === rows.length - 1 ? format(row.date, "dd.MM") : undefined

      return (
        <TableRow
          key={i}
          sx={{
            "td, th": {
              border: 0,
            },
            "&:nth-of-type(odd)": {
              backgroundColor: "#eeeeee",
            },
            backgroundColor: isCurrent ? "#ffb74d" : undefined,
          }}
        >
          <TableCell component="th" scope="row">
            {date}
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
