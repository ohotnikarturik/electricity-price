"use client"

import { Typography } from "@mui/material"
import { format } from "date-fns"
import React, { useState, useEffect } from "react"

const DigitalClock = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timerID)
    }
  }, [])

  return <Typography>{format(time, "HH:mm")}</Typography>
}

export default DigitalClock
