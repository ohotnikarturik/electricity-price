import { Box, Container, Typography } from "@mui/material"

const Header = () => {
  return (
    <Container
      component="footer"
      maxWidth="md"
      sx={{
        display: "flex",
        py: 2,
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" component="h1" sx={{ textAlign: "center" }}>
        Current spot price of electricity in Finland🇫🇮
      </Typography>
    </Container>
  )
}
export default Header
