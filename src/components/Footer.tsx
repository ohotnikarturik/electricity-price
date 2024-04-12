import { Box, Container } from "@mui/material"
import Copyright from "./Copyright"

const Footer = () => {
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
      <Copyright />
    </Container>
  )
}
export default Footer
