"use client"

import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import { useState } from "react"

export default function BasicDateCalendar() {
  const [value, setValue] = useState(new Date())
  console.log("value", value, new Date(value))
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
    </LocalizationProvider>
  )
}
