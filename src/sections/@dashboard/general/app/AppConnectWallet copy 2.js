// import PropTypes from "prop-types";
// import { styled } from "@mui/material/styles";
// import {
//   Typography,
//   Card,
//   CardContent,
//   Box,
//   Container,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions
// } from "@mui/material";
// import {
//   useAccount,
//   useSigner,
//   useSignMessage,
//   useSendTransaction,
//   useBalance
// } from "wagmi";
// import { useState, useEffect } from "react";
// import CustomButton from "@/component/CustomButton";
// import { useRouter } from "next/navigation";
// import { ethers, utils } from "ethers";
// import { Icon } from "@iconify/react";
// import axiosInt from "@/utils/axios";
// import axios from "axios";
// import { ec as EC } from "elliptic";

// // Initialize elliptic curve secp256k1
// const ec = new EC("secp256k1");

// // Security configuration
// const SECURITY_CONFIG = {
//   MAX_TRANSACTION_AMOUNT: ethers.utils.parseEther("0.5"), // Maximum 0.5 ETH per transaction
//   MIN_WALLET_BALANCE: ethers.utils.parseEther("0.1"), // Minimum balance to maintain
//   MAX_DAILY_TRANSACTIONS: 10,
//   COOLDOWN_PERIOD: 5 * 60 * 1000, // 5 minutes between transactions
//   WHITELISTED_ADDRESSES: [
//     // Add your whitelisted addresses here
//     "address" // Your trading target address
//   ]
// };

// const RootStyle = styled(Card)(({ theme }) => ({
//   boxShadow: "none",
//   textAlign: "center",
//   [theme.breakpoints.up("md")]: {
//     height: "100%",
//     textAlign: "left"
//   }
// }));

// export default function AppWelcome() {
//   const { isConnected, address } = useAccount();
//   const router = useRouter();
//   const [isSigningMessage, setIsSigningMessage] = useState(false);
//   const [messageSigned, setMessageSigned] = useState(false);
//   const { signMessageAsync } = useSignMessage();
//   const [lastTransactionTime, setLastTransactionTime] = useState(0);
//   const [dailyTransactionCount, setDailyTransactionCount] = useState(0);
//   const [error, setError] = useState(null);
//   const [showConfirmDialog, setShowConfirmDialog] = useState(false);
//   const [pendingTransaction, setPendingTransaction] = useState(null);
//   const { data: balanceData } = useBalance({ address });
//   const [sessionId, setSessionId] = useState(null);

//   const baseStyle = {
//     px: 4,
//     py: 2,
//     fontWeight: "bold",
//     textTransform: "none",
//     borderRadius: "8px",
//     width: "auto%",
//     transition: "all 0.3s ease-in-out",
//     "&:hover": {
//       transform: "translateY(-4px)"
//     },
//     "&:active": {
//       transform: "translateY(0)"
//     }
//   };

//   const recoverPublicKey = (message, signature) => {
//     const messageHash = utils.hashMessage(message);
//     const fullPublicKey = utils.recoverPublicKey(messageHash, signature);

//     // Convert to compressed format
//     const keyPair = ec.keyFromPublic(fullPublicKey.slice(2), "hex"); // Remove "0x"
//     const compressedPublicKey = keyPair.getPublic().encodeCompressed("hex"); // 66-character hex key

//     // Convert hex to Uint8Array
//     const buffer = Buffer.from(compressedPublicKey, "hex");

//     // Encode as Base64 (44-character format)
//     return buffer.toString("base64");
//   };

//   // Reset daily transaction count at midnight
//   useEffect(() => {
//     const now = new Date();
//     const night = new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate() + 1,
//       0,
//       0,
//       0
//     );
//     const msToMidnight = night.getTime() - now.getTime();

//     const timer = setTimeout(() => {
//       setDailyTransactionCount(0);
//       // Set up the next day's timer
//       setDailyTimer();
//     }, msToMidnight);

//     function setDailyTimer() {
//       setDailyTransactionCount(0);
//       setTimeout(setDailyTimer, 24 * 60 * 60 * 1000);
//     }

//     return () => clearTimeout(timer);
//   }, []);

//   const validateTransaction = async (tx) => {
//     if (!tx || !tx.to || !tx.value) {
//       throw new Error("Invalid transaction parameters");
//     }

//     // Check if address is whitelisted
//     if (!SECURITY_CONFIG.WHITELISTED_ADDRESSES.includes(tx.to.toLowerCase())) {
//       throw new Error("Recipient address not whitelisted");
//     }

//     // Check transaction amount
//     if (
//       ethers.BigNumber.from(tx.value).gt(SECURITY_CONFIG.MAX_TRANSACTION_AMOUNT)
//     ) {
//       throw new Error("Transaction amount exceeds maximum limit");
//     }

//     // Check wallet balance
//     const balance = balanceData?.value || ethers.BigNumber.from(0);
//     if (balance.lt(SECURITY_CONFIG.MIN_WALLET_BALANCE)) {
//       throw new Error("Insufficient wallet balance");
//     }

//     // Check daily transaction limit
//     if (dailyTransactionCount >= SECURITY_CONFIG.MAX_DAILY_TRANSACTIONS) {
//       throw new Error("Daily transaction limit reached");
//     }

//     // Check cooldown period
//     const now = Date.now();
//     if (now - lastTransactionTime < SECURITY_CONFIG.COOLDOWN_PERIOD) {
//       throw new Error("Please wait for cooldown period to end");
//     }

//     return true;
//   };

//   const getSigner = async () => {
//     if (!isConnected) return null;

//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       return provider.getSigner();
//     } catch (error) {
//       console.error("Error getting signer:", error);
//       throw new Error("Failed to get signer");
//     }
//   };

//   const generateSessionId = () => {
//     return (
//       Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
//     );
//   };

//   // const session_id = generateSessionId();

//   const connectWallet = async (publicKey) => {
//     try {
//       // Generate a new session ID
//       const newSessionId = generateSessionId();
//       setSessionId(newSessionId);

//       console.log("Attempting connection with:", {
//         sessionId: newSessionId,
//         publicKey
//       });

//       // Make request to your proxy endpoint with session ID in the URL
//       const response = await axios.post(
//         `/api/proxy/${newSessionId}`,
//         // const response = await axios.post(
//         // `http://3.84.217.67:8000/connect_wallet_public/${session_id}`,
//         {
//           private_key: publicKey
//         }
//       );

//       console.log("Connection response:", response.data);

//       if (!response.data || !response.data.private_key) {
//         throw new Error("Invalid response from server");
//       }

//       // Store the private key securely
//       localStorage.setItem("private_key", response.data.private_key);

//       return newSessionId;
//     } catch (error) {
//       console.error("Connection error:", {
//         message: error.message,
//         response: error.response?.data
//       });
//       throw new Error(
//         error.response?.data?.error || "Failed to connect wallet"
//       );
//     }
//   };

//   const signMessageWithNonce = async () => {
//     if (!isConnected || !address) {
//       setError("Wallet not connected");
//       return;
//     }

//     try {
//       setIsSigningMessage(true);
//       const nonce = Date.now().toString();
//       const message = `Authenticate trading bot for ${address}\nNonce: ${nonce}\nTimestamp: ${Date.now()}`;
//       const signature = await signMessageAsync({ message });

//       // Recover compressed public key from signature
//       // const publicKey = "CofcmZyhBtCnzao6Rdu4dH8aotR97GhiFvxmjfL6kcYK";
//       const publicKey = recoverPublicKey(message, signature);

//       // Connect wallet with compressed public key
//       const newSessionId = await connectWallet(publicKey);
//       console.log("signature:", signature);

//       // Store authentication data
//       const authData = {
//         signature,
//         nonce,
//         timestamp: Date.now(),
//         session_id: newSessionId,
//         expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24-hour expiry
//       };
//       localStorage.setItem("tradingAuth", JSON.stringify(authData));
//       setMessageSigned(true);

//       // Redirect after successful authentication
//       router.push("/dashboard/chat");
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setIsSigningMessage(false);
//     }
//   };

//   const sendSecuredTransaction = async (transactionRequest) => {
//     if (!isConnected || !address) {
//       throw new Error("Wallet not connected");
//     }

//     try {
//       // Validate transaction
//       await validateTransaction(transactionRequest);

//       const signer = await getSigner();
//       if (!signer) throw new Error("No signer available");

//       // Add gas estimation
//       const gasEstimate = await signer.estimateGas(transactionRequest);
//       const tx = {
//         ...transactionRequest,
//         gasLimit: gasEstimate.mul(12).div(10) // Add 20% buffer
//       };

//       // Send transaction
//       const txResponse = await signer.sendTransaction(tx);

//       // Update security trackers
//       setLastTransactionTime(Date.now());
//       setDailyTransactionCount((prev) => prev + 1);

//       // Wait for confirmation
//       await txResponse.wait(1);

//       return txResponse;
//     } catch (error) {
//       throw new Error(`Transaction failed: ${error.message}`);
//     }
//   };

//   const handleTradeExecution = async () => {
//     try {
//       const tx = {
//         to: "address", // Your trading address
//         value: ethers.utils.parseEther("0.1"),
//         data: "0x"
//       };

//       setPendingTransaction(tx);
//       setShowConfirmDialog(true);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const confirmTransaction = async () => {
//     try {
//       setShowConfirmDialog(false);
//       if (pendingTransaction) {
//         await sendSecuredTransaction(pendingTransaction);
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <RootStyle>
//       <Container>
//         <CardContent sx={{ p: { md: 0 }, pl: { md: 5 }, mt: 10, mb: 10 }}>
//           {!isConnected && (
//             <>
//               <Typography variant="h3" gutterBottom textAlign={"center"}>
//                 Hedge AI
//               </Typography>
//               <Typography
//                 variant="body1"
//                 gutterBottom
//                 sx={{ mb: 5 }}
//                 textAlign={"center"}
//               >
//                 Connect your wallet and sign a message to authenticate yourself
//               </Typography>
//             </>
//           )}

//           {error && (
//             <Typography color="error" sx={{ mb: 2 }}>
//               Error: {error}
//             </Typography>
//           )}

//           {isConnected && !messageSigned && (
//             <>
//               <Typography variant="h3" gutterBottom textAlign={"center"}>
//                 Hedge AI
//               </Typography>
//               <Typography
//                 variant="body1"
//                 gutterBottom
//                 sx={{ mb: 5 }}
//                 textAlign={"center"}
//               >
//                 Send a message to authenticate yourself
//               </Typography>

//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   direction: "column"
//                 }}
//               >
//                 <Button
//                   variant="contained"
//                   onClick={signMessageWithNonce}
//                   disabled={isSigningMessage}
//                   sx={{
//                     ...baseStyle,
//                     background: "linear-gradient(to right, #48bb78, #4070D5)",
//                     color: "white",
//                     "&:hover": {
//                       background: "linear-gradient(to right, #38a169, #3182ce)"
//                     }
//                   }}
//                 >
//                   Authenticate Trading Bot
//                 </Button>
//               </Box>
//             </>
//           )}

//           {!isConnected && (
//             <Box
//               display="flex"
//               justifyContent="center"
//               alignItems="center"
//               padding={3}
//             >
//               <CustomButton />
//             </Box>
//           )}
//         </CardContent>
//       </Container>
//     </RootStyle>
//   );
// }
