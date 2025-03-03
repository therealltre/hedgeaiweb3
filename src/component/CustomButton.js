// "use client";

// import { useWeb3Modal } from "@web3modal/wagmi/react";
// import { useAccount, useDisconnect } from "wagmi";
// import { Button } from "@mui/material";
// import { Icon } from "@iconify/react";
// import { useRouter } from "next/navigation"; // Import useRouter

// export default function CustomButton() {
//   const { open } = useWeb3Modal();
//   const { isConnected } = useAccount();
//   const { disconnect } = useDisconnect();
//   const router = useRouter(); // Initialize the router

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

//   if (isConnected) {
//     return (
//       <Button
//         onClick={() => {
//           disconnect(); // Disconnect the wallet
//           router.push("/dashboard"); // Redirect user to dashboard
//         }}
//         sx={{
//           ...baseStyle,
//           background: "linear-gradient(to right, #f56565, #ed64a6)",
//           color: "white",
//           "&:hover": {
//             background: "linear-gradient(to right, #e53e3e, #d53f8c)"
//           }
//         }}
//       >
//         <Icon
//           icon="fluent:plug-disconnected-48-filled"
//           width="24"
//           height="24"
//           style={{ marginRight: "8px" }}
//         />
//         Disconnect
//       </Button>
//     );
//   }

//   return (
//     <Button
//       onClick={() => open()}
//       sx={{
//         ...baseStyle,
//         background: "linear-gradient(to right, #48bb78, #4070D5)",
//         color: "white",
//         "&:hover": {
//           background: "linear-gradient(to right, #38a169, #3182ce)"
//         }
//       }}
//     >
//       <Icon
//         icon="hugeicons:bitcoin-wallet"
//         width="24"
//         height="24"
//         style={{ marginRight: "8px" }}
//       />
//       Connect Wallet
//     </Button>
//   );
// }
