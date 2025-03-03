import { useState } from "react";
import { useRouter } from "next/navigation";
import { styled, useTheme } from "@mui/material/styles";
import {
  Typography,
  Card,
  CardContent,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useGetUserDataQuery } from "@/redux/api-get/getUserDetail";
import { ChatBotSolanaWindow } from "../../chat";
import { useSnackbar } from "notistack";

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    height: "100%",
    textAlign: "left",
  },
}));

export default function AppSelectWalletOption() {
  const { connected } = useWallet();
  const { enqueueSnackbar } = useSnackbar();
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const [importError, setImportError] = useState(null);
  const { data, error, isLoading } = useGetUserDataQuery();
  const [newWallet, setNewWallet] = useState(null);
  console.log("🚀 ~ AppSelectWalletOption ~ data:", data)

  // -----------
  // Import Wallet
  // -----------

  const handleImportWallet = async () => {
    setImportError(null); // Reset error before new attempt
    if (!privateKey) {
      const errorMsg = "Please enter a private key";
      setImportError(errorMsg);
      enqueueSnackbar(errorMsg, { variant: "error" });
      return;
    }

    try {
      // Make the POST request to import the wallet
      const response = await axios.post(
        "http://localhost:5000/api/v1/wallet/import",
        { privateKey },
        { withCredentials: true }
      );

      console.log("Wallet imported successfully:", response.data);
      // Optionally close the dialog
      setImportModalOpen(false);
      // Clear the private key field
      setPrivateKey("");
      // Display success notification
      enqueueSnackbar(response.data.message || "Wallet imported successfully", {
        variant: "success",
      });
    } catch (error) {
      console.error("Error importing wallet:", error);
      const errorMsg =
        error.response?.data?.message || "Error importing wallet. Try again.";
      setImportError(errorMsg);
      enqueueSnackbar(errorMsg, { variant: "error" });
    }
  };

  // -----------
  // Create Wallet
  // -----------
  const handleCreateWallet = async () => {
    try {
      // Make the POST request to create a wallet
      const response = await axios.post(
        "http://localhost:5000/api/v1/wallet/create",
        {},
        { withCredentials: true }
      );

      console.log("Wallet created successfully:", response.data);
      // Optionally store the wallet info in state to display it
      setNewWallet(response.data.wallet);
      // Close the dialog if you like
      setCreateModalOpen(false);
      // Display success notification
      enqueueSnackbar(response.data.message || "Wallet created successfully", {
        variant: "success",
      });
    } catch (error) {
      console.error("Error creating wallet:", error);
      const errorMsg =
        error.response?.data?.message ||
        "Something went wrong while creating the wallet.";
      enqueueSnackbar(errorMsg, { variant: "error" });
    }
  };

  return (
    <RootStyle>
      {data && (
        <>
          <ChatBotSolanaWindow />
        </>
      )}
      {!data && (
        <>
          <Container>
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h3" gutterBottom textAlign="center">
                Hedge AI
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                textAlign="center"
                sx={{ mb: 5 }}
              >
                Connect your wallet or import an existing one.
              </Typography>

              {!connected && (
                <Container
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    flexWrap: "wrap",
                    "@media (min-width:600px)": {
                      justifyContent: "space-evenly",
                    },
                    "@media (min-width:960px)": {
                      justifyContent: "center",
                      gap: 3,
                    },
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => setImportModalOpen(true)}
                    sx={{ width: 150, height: 50 }}
                  >
                    Import Wallet
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setCreateModalOpen(true)}
                    sx={{ width: 150, height: 50 }}
                  >
                    Create Wallet
                  </Button>
                  {/* <WalletMultiButton /> */}
                </Container>
              )}
            </CardContent>
          </Container>

          {/* Import Wallet Modal */}
          <Dialog
            open={importModalOpen}
            onClose={() => setImportModalOpen(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Import Wallet</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Solana Private Key (BS58)"
                variant="outlined"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                error={!!importError}
                helperText={importError}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setImportModalOpen(false)}>Cancel</Button>
              <Button onClick={handleImportWallet} variant="contained">
                Import Wallet
              </Button>
            </DialogActions>
          </Dialog>

          {/* Create Wallet Modal */}
          <Dialog
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle sx={{ mb: 2 }}>Create Wallet</DialogTitle>
            <DialogContent>
              <Button variant="contained" onClick={handleCreateWallet}>
                Generate New Wallet
              </Button>

              {/* If you want to display the newly created wallet info */}
              {newWallet && (
                <>
                  <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                    Public Key: {newWallet.address}
                  </Typography>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setCreateModalOpen(false)}>Close</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </RootStyle>
  );
}
