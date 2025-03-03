// next
import NextLink from "next/link";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Card, Link, Container, Typography } from "@mui/material";
// hooks
import useResponsive from "../../hooks/useResponsive";
// routes
import { PATH_AUTH } from "../../routes/paths";

// components
import Page from "../../components/Page";
import LogoImage from "../../components/LogoImage";
import Image from "../../components/Image";
// sections
import { RegisterForm } from "../../sections/auth/register";
import GuestGuard from "@/guards/GuestGuard";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex"
  }
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7)
  }
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Register() {
  const smUp = useResponsive("up", "sm");

  const mdUp = useResponsive("up", "md");

  return (
    // <GuestGuard>
    <Page title="Register">
      <RootStyle>
        <HeaderStyle>
          <LogoImage />

          {/* {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Already have an account? {""}
              <NextLink href={PATH_AUTH.login} passhref="true">
                <Link variant="subtitle2">Login</Link>
              </NextLink>
            </Typography>
          )} */}
        </HeaderStyle>

        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5, display: "flex", alignItems: "center" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Fill the form to Get started.
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Enter the details below.
                </Typography>
              </Box>
            </Box>

            <RegisterForm />

            <Typography
              variant="body2"
              align="center"
              sx={{ color: "text.secondary", mt: 3 }}
            >
              By registering, I agree to Tre Boilerplatet &nbsp; <br />
              <Link underline="hover" color="text.primary" href="#">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link underline="hover" color="text.primary" href="#">
                Privacy Policy
              </Link>
              .
            </Typography>

            {/* {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
                Already have an account?{" "}
                <NextLink
                  href={PATH_AUTH.login}
                  passhref="true"
                  underline="none"
                >
                  <Link
                    variant="subtitle2"
                    underline="none"
                    style={{ textDecoration: "none" }}
                  >
                    Login
                  </Link>
                </NextLink>
              </Typography>
            )} */}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
    // </GuestGuard>
  );
}
