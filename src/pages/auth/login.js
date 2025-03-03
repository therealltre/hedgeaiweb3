// next
import NextLink from "next/link";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Card, Stack, Link, Container, Typography } from "@mui/material";
// routes
import { PATH_AUTH } from "../../routes/paths";
// hooks
import useResponsive from "../../hooks/useResponsive";
// components
import Page from "../../components/Page";
// sections
import { LoginForm } from "../../sections/auth/login";
import LogoImage from "../../components/LogoImage";
// import Logo from "@/components/Logo";

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

export default function Login() {
  const smUp = useResponsive("up", "sm");

  const mdUp = useResponsive("up", "md");

  return (
    // <GuestGuard>
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <LogoImage />
          {/* <Logo /> */}

          {/* {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Don&apos;t have an account? {""}
              <NextLink href={PATH_AUTH.register} passhref="true">
                <Link variant="subtitle2">Get started</Link>
              </NextLink>
            </Typography>
          )} */}
        </HeaderStyle>

        <Container maxWidth="sm">
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Sign in to Hedge AI
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Enter your details below.
                </Typography>
              </Box>
            </Stack>

            <LoginForm />

            {/* {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don&apos;t have an account?{" "}
                <NextLink
                  href={PATH_AUTH.register}
                  passhref="true"
                  underline="none"
                  style={{ textDecoration: "none" }}
                >
                  <Link
                    variant="subtitle2"
                    underline="none"
                    style={{ textDecoration: "none" }}
                  >
                    Get started
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
