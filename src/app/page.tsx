import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Copyright from "@/components/Copyright"

// import Calendar from "@/components/Calendar"
import Table from "@/components/Table"
import { getHourlyPrices } from "@/actions/getHourlyPrices"

export default async function Home() {
  const hourlyPrices = await getHourlyPrices()

  return (
    <Container maxWidth="sm">
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
        <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
          Electricity Hourly price 🇫🇮
        </Typography>
        {/* <Calendar /> */}
        <Table rows={hourlyPrices} />
        <Copyright />
      </Box>
    </Container>
  )
}
