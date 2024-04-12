import Box from "@mui/material/Box"

import Table from "@/components/Table"
import { getHourlyPrices } from "@/actions/getHourlyPrices"
import { Card } from "@mui/material"
import BarChart from "@/components/BarChart"

export default async function Home() {
  const hourlyPrice = await getHourlyPrices()

  return (
    <Box
      sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Card sx={{ width: "100%", height: "100%", m: 2 }}>
        <BarChart data={hourlyPrice} />
      </Card>
      <Table rows={hourlyPrice} />
    </Box>
  )
}
