import Box from "@mui/material/Box"

import Table from "@/components/Table"
import { getHourlyPrices } from "@/actions/getHourlyPrices"

export default async function Home() {
  const hourlyPrices = await getHourlyPrices()

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
      <Table rows={hourlyPrices} />
    </Box>
  )
}
