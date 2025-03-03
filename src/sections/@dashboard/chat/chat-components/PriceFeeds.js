// import { useState, useEffect } from "react";
// import { ethers } from "ethers";

// // ... keep existing ABI and NETWORKS constants ...

// const usePriceFeed = (tokens = ["ETH/USD", "BTC/USD"]) => {
//   const [prices, setPrices] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [network, setNetwork] = useState(null);

//   useEffect(() => {
//     let mounted = true;
//     let provider;
//     let priceFeeds = {};

//     const setupPriceFeeds = async () => {
//       try {
//         // Check for various Web3 providers
//         if (typeof window.ethereum !== "undefined") {
//           provider = new ethers.providers.Web3Provider(window.ethereum);
//         } else if (typeof window.web3 !== "undefined") {
//           provider = new ethers.providers.Web3Provider(
//             window.web3.currentProvider
//           );
//         } else {
//           // Fallback to a default provider (Infura/Alchemy)
//           provider = new ethers.providers.JsonRpcProvider(
//             "https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY" // Replace with your API key
//           );
//         }

//         // Get current network
//         const network = await provider.getNetwork();
//         setNetwork(network.chainId);

//         // Check if we support this network
//         if (!NETWORKS[network.chainId]) {
//           throw new Error(
//             `Network ${network.chainId} not supported. Please switch to Ethereum Mainnet or Sepolia`
//           );
//         }

//         // Initialize price feed contracts
//         tokens.forEach((token) => {
//           if (NETWORKS[network.chainId][token]) {
//             priceFeeds[token] = new ethers.Contract(
//               NETWORKS[network.chainId][token],
//               PRICE_FEED_ABI,
//               provider
//             );
//           }
//         });

//         // Initial price fetch
//         await updatePrices();

//         // Set up interval for price updates
//         const interval = setInterval(updatePrices, 30000);

//         // Listen for network changes if provider supports it
//         if (window.ethereum) {
//           window.ethereum.on("chainChanged", (chainId) => {
//             window.location.reload();
//           });
//         }

//         return () => {
//           mounted = false;
//           clearInterval(interval);
//           if (window.ethereum) {
//             window.ethereum.removeAllListeners("chainChanged");
//           }
//         };
//       } catch (err) {
//         console.error("Setup error:", err);
//         if (mounted) {
//           setError(err.message);
//           setLoading(false);
//         }
//       }
//     };

//     const updatePrices = async () => {
//       if (!provider) return;

//       try {
//         const newPrices = {};

//         await Promise.all(
//           tokens.map(async (token) => {
//             if (!priceFeeds[token]) return;

//             const [, answer, , updatedAt] = await priceFeeds[
//               token
//             ].latestRoundData();

//             const price = parseFloat(ethers.utils.formatUnits(answer, 8));

//             newPrices[token] = {
//               price,
//               lastUpdate: new Date(updatedAt * 1000).toISOString(),
//               formattedPrice: `$${price.toLocaleString(undefined, {
//                 minimumFractionDigits: 2,
//                 maximumFractionDigits: 2
//               })}`
//             };
//           })
//         );

//         if (mounted) {
//           setPrices(newPrices);
//           setLoading(false);
//         }
//       } catch (err) {
//         console.error("Price update error:", err);
//         if (mounted) {
//           setError(err.message);
//           setLoading(false);
//         }
//       }
//     };

//     setupPriceFeeds();

//     return () => {
//       mounted = false;
//     };
//   }, [tokens]);

//   return { prices, loading, error, network };
// };

// export default usePriceFeed;
