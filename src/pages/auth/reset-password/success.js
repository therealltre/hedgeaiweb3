import { Box, Button, Typography, Container } from "@mui/material";
import NextLink from "next/link";
import { SentIcon } from "../../../assets";
import { styled } from "@mui/material/styles";
import Layout from "../../../layouts";
import Page from "../../../components/Page";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(12, 0)
}));

ResetSuccess.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

export default function ResetSuccess() {
  return (
    <Page title="Reset Success" sx={{ height: 1 }}>
      <RootStyle>
        <Container sx={{ textAlign: "center", mt: 10 }}>
          <SentIcon sx={{ height: 160, mb: 4 }} />
          <Typography variant="h4">Password Changed Successfully</Typography>
          <Typography sx={{ my: 2 }}>
            You can now log in with your new password.
          </Typography>

          <NextLink href="/auth/login" passHref>
            <Button variant="contained" size="large">
              Go to Login
            </Button>
          </NextLink>
        </Container>
      </RootStyle>
    </Page>
  );
}
