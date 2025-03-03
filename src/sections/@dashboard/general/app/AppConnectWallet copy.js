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
// import { ethers } from "ethers";
// import { Icon } from "@iconify/react";
// import axiosInt from "@/utils/axios";
// import axios from "axios";

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
//     const messageHash = ethers.utils.hashMessage(message);
//     return ethers.utils.recoverPublicKey(messageHash, signature);
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

//   const connectWallet = async (private_key) => {
//     try {
//       const response = await axios.post("/api/proxy", {
//         private_key: private_key
//       });
//       console.log("Server Response:", response.data);
//       return response.data.session_id; // Retrieve session_id
//     } catch (error) {
//       console.error("Error:", error.response?.data?.error || error.message);
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

//       // Recover public key (replace with actual implementation)
//       const private_key = recoverPublicKey;

//       // const private_key =
//       //   "2PKDX8yQqQzncTAaCgBgzmjNa2sYVhjTFRYae6VJ4APXP7JvFPNSwM4akM8skdhWXZLCwyWNjiuQtg1K3TdtT2gs"; // 🔥 Replace with real key recovery

//       console.log("Recovered Public Key:", private_key);
//       console.log("Generated Session ID:", generateSessionId());

//       // Connect wallet with the recovered public key
//       await connectWallet(private_key);

//       // Store authentication data
//       const authData = {
//         signature,
//         nonce,
//         timestamp: Date.now(),
//         session_id: generateSessionId(),
//         expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24-hour expiry
//       };
//       localStorage.setItem("tradingAuth", JSON.stringify(authData));
//       setMessageSigned(true);

//       // Redirect after authentication
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

//           {/* {isConnected && messageSigned && (
//             <Box mt={3}>
//               <Typography variant="body1" gutterBottom>
//                 Daily Transactions: {dailyTransactionCount}/
//                 {SECURITY_CONFIG.MAX_DAILY_TRANSACTIONS}
//               </Typography>

//               <Button
//                 variant="contained"
//                 onClick={handleTradeExecution}
//                 disabled={
//                   dailyTransactionCount >=
//                     SECURITY_CONFIG.MAX_DAILY_TRANSACTIONS ||
//                   Date.now() - lastTransactionTime <
//                     SECURITY_CONFIG.COOLDOWN_PERIOD
//                 }
//                 sx={{
//                   background: "linear-gradient(to right, #48bb78, #4070D5)",
//                   color: "white"
//                 }}
//               >
//                 Execute Trade
//               </Button>
//             </Box>
//           )} */}

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

//           {/* <Dialog
//             open={showConfirmDialog}
//             onClose={() => setShowConfirmDialog(false)}
//           >
//             <DialogTitle>Confirm Transaction</DialogTitle>
//             <DialogContent>
//               <Typography>
//                 Amount: 0.1 ETH
//                 {pendingTransaction && (
//                   <>
//                     <br />
//                     To: {pendingTransaction.to}
//                   </>
//                 )}
//               </Typography>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setShowConfirmDialog(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={confirmTransaction} variant="contained">
//                 Confirm
//               </Button>
//             </DialogActions>
//           </Dialog> */}
//         </CardContent>
//       </Container>
//     </RootStyle>
//   );
// }
