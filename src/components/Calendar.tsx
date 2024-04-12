"use client"

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import { useState } from "react"

export default function BasicDateCalendar() {
  const [value, setValue] = useState<Date>(new Date())

  console.log("value", value, new Date(value))
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date Picker"
        format="dd.MM.yyyy"
        onChange={(newValue) => {
          setValue(newValue as Date)
        }}
      />
    </LocalizationProvider>
  )
}
