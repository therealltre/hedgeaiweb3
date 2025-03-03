import { useState } from "react";
// next
import NextLink from "next/link";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Button, Container, Typography } from "@mui/material";
// routes
import { PATH_AUTH } from "../../../routes/paths";
// layouts
import Layout from "../../../layouts";
// components
import Page from "../../../components/Page";
// sections
import { ResetPasswordForm } from "../../../sections/auth/reset-password";
import { SentIcon } from "../../../assets";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

ResetPassword.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const router = useRouter(); // <-- Initialize the router
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSuccess = () => {
    // Redirect user to the New Password page
    router.push(`/auth/reset-password/[token]`);
  };

  return (
    <Page title="Reset Password" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, mx: "auto" }}>
            {!sent ? (
              <>
                <Typography variant="h3" paragraph>
                  Forgot your password?
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 5 }}>
                  Please enter the email address associated with your account
                  and We will email you a link to reset your password.
                </Typography>

                <ResetPasswordForm
                  onSent={() => setSent(true)}
                  onGetEmail={(value) => setEmail(value)}
                />

                <NextLink href={PATH_AUTH.login} passhref="true">
                  <Button fullWidth size="large" sx={{ mt: 1 }}>
                    Back
                  </Button>
                </NextLink>
              </>
            ) : (
              <Box sx={{ textAlign: "center" }}>
                <SentIcon sx={{ mb: 5, mx: "auto", height: 160 }} />

                <Typography variant="h3" gutterBottom>
                  Request sent successfully
                </Typography>
                <Typography>
                  We have sent a confirmation email to &nbsp;
                  <strong>{email}</strong>
                  <br />
                  Please check your email.
                </Typography>

                <NextLink href={PATH_AUTH.login} passhref="true">
                  <Button size="large" variant="contained" sx={{ mt: 5 }}>
                    Back
                  </Button>
                </NextLink>
              </Box>
            )}
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
