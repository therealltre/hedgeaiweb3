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
import {
  // AppConnectWallet,
  // AppConnectSolanaWallet,
  AppSelectWalletOption
  // AppTopInstalledCountries
} from "../../sections/@dashboard/general/app";

// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralApp({ userData }) {
  // console.log("🚀 ~ GeneralApp ~ userData:", userData)
  const theme = useTheme();

  const { themeStretch } = useSettings();

  return (
    <Page title="Overview">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <AppSelectWalletOption />
        {/* <AppConnectSolanaWallet /> */}
        {/* <AppConnectWallet /> */}
      </Container>
    </Page>
  );
}

// export async function getServerSideProps() {
//   console.log("🚀 ~ getServerSideProps ~ getServerSideProps:");
//   const userData = await getUserDetails();
//   // If no userData (likely because no access token exists), redirect to '/'
//   if (!userData) {
//     return {
      
//     }
//   }
//   return {
//     props: { userData },
//   };
// }
