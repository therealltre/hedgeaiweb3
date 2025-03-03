// @mui
import { useTheme } from "@mui/material/styles";
import { Container, Grid, Stack } from "@mui/material";
// hooks
import useSettings from "../../hooks/useSettings";
// layouts
import Layout from "../../layouts";
// components
import Page from "../../components/Page";
// sections

// ----------------------------------------------------------------------

GeneralFarms.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralFarms() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  return (
    <Page title="Farms">
      <Container maxWidth={themeStretch ? false : "xl"}>
        {/* <AppConnectSolanaWallet /> */}
      </Container>
    </Page>
  );
}
