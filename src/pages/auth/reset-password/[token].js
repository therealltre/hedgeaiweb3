  import Layout from "../../../layouts";
  import Page from "../../../components/Page";
  import { Box, Container } from "@mui/material";
  import { NewPasswordForm } from "@/sections/auth/reset-password";
  import { styled } from "@mui/material/styles";

  // ----------------------------------------------------------------------

  const RootStyle = styled("div")(({ theme }) => ({
    display: "flex",
    minHeight: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(12, 0)
  }));

  ResetPasswordPage.getLayout = function getLayout(page) {
    return <Layout variant="logoOnly">{page}</Layout>;
  };

  export default function ResetPasswordPage() {
    return (
      <Page title="Reset Password" sx={{ height: 1 }}>
        <RootStyle>
          <Container>
            <Box sx={{ maxWidth: 480, mx: "auto" }}>
              <NewPasswordForm />
            </Box>
          </Container>
        </RootStyle>
      </Page>
    );
  }
