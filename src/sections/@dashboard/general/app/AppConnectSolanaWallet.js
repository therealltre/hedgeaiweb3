
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";
import { Icon } from "@iconify/react";
import axiosInt from "@/utils/axios";
import axios from "axios";
import * as nacl from "tweetnacl";
import bs58 from "bs58";
import { useGetUserDataQuery } from "@/redux/api-get/getUserDetail";
import { getUserDetails } from "@/apiCalls";
import { useSnackbar } from "notistack";

require("@solana/wallet-adapter-react-ui/styles.css");

const SECURITY_CONFIG = {
  MAX_TRANSACTION_AMOUNT: 0.5 * LAMPORTS_PER_SOL,
  MIN_WALLET_BALANCE: 0.1 * LAMPORTS_PER_SOL,
  MAX_DAILY_TRANSACTIONS: 10,
  COOLDOWN_PERIOD: 5 * 60 * 1000,
  WHITELISTED_ADDRESSES: ["address"],
};

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    height: "100%",
    textAlign: "left",
  },
}));

export default function AppConnectSolanaWallet({ userData }) {
  // console.log("🚀 ~ AppConnectSolanaWallet ~ userData:", userData);
  const wallet = useWallet();
  
    const { enqueueSnackbar } = useSnackbar();
  const { connection } = useConnection();
  const { connected, publicKey, signMessage, sendTransaction } = wallet;
  const router = useRouter();
  const [isSigningMessage, setIsSigningMessage] = useState(false);
  const [messageSigned, setMessageSigned] = useState(false);
  const [lastTransactionTime, setLastTransactionTime] = useState(0);
  const [dailyTransactionCount, setDailyTransactionCount] = useState(0);
  const [error, setError] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingTransaction, setPendingTransaction] = useState(null);
  const [balance, setBalance] = useState(0);
  const [sessionId, setSessionId] = useState(null);

  const baseStyle = {
    px: 4,
    py: 2,
    fontWeight: "bold",
    textTransform: "none",
    borderRadius: "8px",
    width: "auto%",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-4px)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
  };

  // Fetch balance
  useEffect(() => {
    const getBalance = async () => {
      if (connected && publicKey && connection) {
        try {
          const balance = await connection.getBalance(publicKey);
          setBalance(balance);
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };

    getBalance();

    // Set up interval to refresh balance
    const intervalId = setInterval(getBalance, 30000); // Refresh every 30 seconds

    return () => clearInterval(intervalId);
  }, [connected, publicKey, connection]);

  // Reset daily transaction count at midnight
  useEffect(() => {
    const now = new Date();
    const night = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0
    );
    const msToMidnight = night.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setDailyTransactionCount(0);
      // Set up the next day's timer
      setDailyTimer();
    }, msToMidnight);

    function setDailyTimer() {
      setDailyTransactionCount(0);
      setTimeout(setDailyTimer, 24 * 60 * 60 * 1000);
    }

    return () => clearTimeout(timer);
  }, []);

  const generateSessionId = () => {
    return (
      Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
    );
  };

  const validateTransaction = async (tx) => {
    if (!tx || !tx.to) {
      throw new Error("Invalid transaction parameters");
    }

    // Check if address is whitelisted
    if (!SECURITY_CONFIG.WHITELISTED_ADDRESSES.includes(tx.to)) {
      throw new Error("Recipient address not whitelisted");
    }

    // Check transaction amount
    if (tx.amount > SECURITY_CONFIG.MAX_TRANSACTION_AMOUNT) {
      throw new Error("Transaction amount exceeds maximum limit");
    }

    // Check wallet balance
    if (balance < SECURITY_CONFIG.MIN_WALLET_BALANCE) {
      throw new Error("Insufficient wallet balance");
    }

    // Check daily transaction limit
    if (dailyTransactionCount >= SECURITY_CONFIG.MAX_DAILY_TRANSACTIONS) {
      throw new Error("Daily transaction limit reached");
    }

    // Check cooldown period
    const now = Date.now();
    if (now - lastTransactionTime < SECURITY_CONFIG.COOLDOWN_PERIOD) {
      throw new Error("Please wait for cooldown period to end");
    }

    return true;
  };

  const connectWallet = async (publicKeyString) => {
    try {
      const newSessionId = generateSessionId();
      setSessionId(newSessionId);

      console.log("Attempting connection with:", {
        sessionId: newSessionId,
        publicKey: publicKeyString,
      });

      const response = await axios.post(`/api/proxy/${newSessionId}`, {
        private_key: publicKeyString,
      });

      console.log("Full connection response:", response); // Add this for debugging

      // Check if the response contains a success message
      if (
        response.data?.message === "Wallet connected successfully." &&
        response.data?.session_id
      ) {
        // Store the session ID
        localStorage.setItem("session_id", newSessionId);
        console.log("Successfully connected!");

        // If there's a session token, store it (optional)
        if (response.data.session_id) {
          localStorage.setItem("session_token", response.data.session_id);
        }

        return newSessionId;
      } else {
        console.error("Unexpected response structure:", response.data);
        throw new Error("Invalid response format from server");
      }
    } catch (error) {
      console.error("Connection error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      // Throw a more specific error based on the response
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error("Failed to connect wallet");
      }
    }
  };

  const signMessageWithNonce = async () => {
    if (!connected || !publicKey) {
      setError("Wallet not connected");
      return;
    }

    try {
      setIsSigningMessage(true);
      const nonce = Date.now().toString();
      const message = new TextEncoder().encode(
        `Authenticate trading bot for ${publicKey.toString()}\nNonce: ${nonce}\nTimestamp: ${Date.now()}`
      );

      const signature = await signMessage(message);
      const signatureBase58 = bs58.encode(signature);

      // Connect wallet with public key
      const newSessionId = await connectWallet(publicKey.toString());

      // Store authentication data
      const authData = {
        signature: signatureBase58,
        nonce,
        timestamp: Date.now(),
        session_id: newSessionId,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24-hour expiry
      };
      localStorage.setItem("tradingAuth", JSON.stringify(authData));
      setMessageSigned(true);

      // Redirect after successful authentication
      router.push("/dashboard/chat");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSigningMessage(false);
    }
  };

  const sendSecuredTransaction = async (transactionRequest) => {
    if (!connected || !publicKey) {
      throw new Error("Wallet not connected");
    }

    try {
      // Validate transaction
      await validateTransaction(transactionRequest);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(transactionRequest.to),
          lamports: transactionRequest.amount,
        })
      );

      // Get latest blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Send transaction
      const signature = await sendTransaction(transaction, connection);

      // Wait for confirmation
      await connection.confirmTransaction(signature, "confirmed");

      // Update security trackers
      setLastTransactionTime(Date.now());
      setDailyTransactionCount((prev) => prev + 1);

      return signature;
    } catch (error) {
      throw new Error(`Transaction failed: ${error.message}`);
    }
  };

  const handleTradeExecution = async () => {
    try {
      const tx = {
        to: "address", // Your trading address
        amount: 0.1 * LAMPORTS_PER_SOL, // 0.1 SOL
      };

      setPendingTransaction(tx);
      setShowConfirmDialog(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const confirmTransaction = async () => {
    try {
      setShowConfirmDialog(false);
      if (pendingTransaction) {
        await sendSecuredTransaction(pendingTransaction);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     const userData = await getUserDetails();
  //     console.log("🚀 ~ userData:", userData);
  //   })();
  // }, []);

  // try{

  // }
  // catch{

  // }

  // const { data, isLoading } = useGetUserDataQuery();
  // console.log("🚀 ~ AppConnectSolanaWallet ~ data:", data)

  // const accessToken = Cookies.get("accessToken");
  // console.log("🚀 ~ AppConnectSolanaWallet ~ accessToken:", accessToken);

  // // Only call API if accessToken exists
  // const { data, isFetching } = useGetUserDataQuery(undefined, {
  //   skip: !accessToken, // Skip API call if token is missing
  // });
  // console.log("🚀 ~ AppConnectSolanaWallet ~ isFetching:", isFetching);

  // console.log("🚀 ~ AppConnectSolanaWallet ~ data:", data);

  // // Redirect to '/' if userData fetching fails
  // useEffect(() => {
  //   if (!isFetching && !accessToken) {
  //     console.error("User data fetch failed. Redirecting...");
  //     router.push("/"); // Redirect user to home page
  //   }
  // }, [isFetching, router]);
  useEffect(() => {
    // getUserDetails();
  }, []);

  return (
    <RootStyle>
      <Container>
        <CardContent sx={{ p: { md: 0 }, pl: { md: 5 }, mt: 10, mb: 10 }}>
          {!connected && (
            <>
              <Typography variant="h3" gutterBottom textAlign={"center"}>
                Hedge AI
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ mb: 5 }}
                textAlign={"center"}
              >
                Connect your wallet and sign a message to authenticate yourself
              </Typography>
            </>
          )}

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              Error: {error}
            </Typography>
          )}

          {connected && !messageSigned && (
            <>
              <Typography variant="h3" gutterBottom textAlign={"center"}>
                Hedge AI
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ mb: 5 }}
                textAlign={"center"}
              >
                Send a message to authenticate yourself
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  direction: "column",
                }}
              >
                <Button
                  variant="contained"
                  onClick={signMessageWithNonce}
                  disabled={isSigningMessage}
                  sx={{
                    ...baseStyle,
                    background: "linear-gradient(to right, #48bb78, #4070D5)",
                    color: "white",
                    "&:hover": {
                      background: "linear-gradient(to right, #38a169, #3182ce)",
                    },
                  }}
                >
                  Authenticate Trading Bot
                </Button>
              </Box>
            </>
          )}

          {/* <button
            onClick={() => {
              console.log("first");
              getUserDetails(enqueueSnackbar);
            }}
          >
            thdjkdasf
          </button> */}

          {!connected && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              padding={3}
            >
              <WalletMultiButton />
            </Box>
          )}
        </CardContent>
      </Container>
    </RootStyle>
  );
}
