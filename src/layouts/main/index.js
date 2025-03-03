import PropTypes from "prop-types";

// @mui
import { Box, Container, Stack, Typography } from "@mui/material";
// components
import LogoImage from "@/components/LogoImage";
//
// import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import { useRouter } from "next/router";
import Link from "next/link";

// ----------------------------------------------------------------------

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default function MainLayout({ children }) {
  const { pathname } = useRouter();

  const isHome = pathname === "/";

  return (
    <Stack sx={{ minHeight: 1 }}>
      <MainHeader />

      {children}

      <Box sx={{ flexGrow: 1 }} />

      {!isHome ? (
        {
          /* <MainFooter /> */
        }
      ) : (
        <Box
          sx={{
            py: 5,
            textAlign: "center",
            position: "relative",
            bgcolor: "background.default"
          }}
        >
          <Container>
            <LogoImage sx={{ mb: 1, mx: "auto" }} />

            <Typography
              variant="caption"
              component="p"
              style={{ fontSize: "16px" }}
            >
              © All rights reserved &nbsp;
              <Link
                href="#"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "16px"
                }}
              >
                Hedge AI
              </Link>
            </Typography>
          </Container>
        </Box>
      )}
    </Stack>
  );
}
