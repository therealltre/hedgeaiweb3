import { useEffect } from "react";
// @mui
import { Box, Card, Container, Stack } from "@mui/material";
// redux
import { useDispatch } from "../../../redux/store";
import { getConversations, getContacts } from "../../../redux/slices/chat";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// hooks
import useSettings from "../../../hooks/useSettings";
// layouts
import Layout from "../../../layouts";
// components
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
// sections
import {
  ChatBotSolanaWindow,
  ChatBotWindow,
  ChatSidebar,
  ChatWindow
} from "../../../sections/@dashboard/chat";
// import CustomButton from "@/component/CustomButton";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

// ----------------------------------------------------------------------

Chat.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Chat() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversations());
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <Page title="Chat">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Stack
          flexDirection={{ xs: "row", md: "row" }}
          justifyContent={"space-between"}
          alignItems={"start"}
        >
          <HeaderBreadcrumbs
            heading="ChatBot"
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              { name: "ChatBot" }
            ]}
          />
          {/* <CustomButton /> */}

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding={2}
          >
            <WalletMultiButton />
          </Box>
          {/* <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <w3m-account-button balance={"show"} />
            <CustomButton />
          </Box> */}
        </Stack>
        <Card sx={{ height: "70vh", display: "flex" }}>
          {/* <ChatSidebar /> */}
          {/* <ChatBotWindow /> */}
          <ChatBotSolanaWindow />
        </Card>
      </Container>
    </Page>
  );
}
