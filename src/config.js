// routes
import { PATH_DASHBOARD } from "./routes/paths";

// API
// ----------------------------------------------------------------------

// export const FIREBASE_API = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APPID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };

// export const COGNITO_API = {
//   userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
//   clientId: process.env.AWS_COGNITO_CLIENT_ID,
// };

// export const AUTH0_API = {
//   clientId: process.env.AUTH0_CLIENT_ID,
//   domain: process.env.AUTH0_DOMAIN,
// };

export const MAPBOX_API = process.env.NEXT_PUBLIC_MAP_API_KEY;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.general.app; // as '/dashboard/app'

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 60,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20
};


export const  BACKEND_URL = "http://localhost:5000" 
// SETTINGS
// ----------------------------------------------------------------------

export const cookiesExpires = 3;

export const cookiesKey = {
  themeMode: "themeMode",
  themeDirection: "themeDirection",
  themeColorPresets: "themeColorPresets",
  themeLayout: "themeLayout",
  themeStretch: "themeStretch"
};

export const defaultSettings = {
  themeMode: "dark",
  themeDirection: "ltr",
  themeColorPresets: "default",
  themeLayout: "horizontal",
  themeStretch: true
};

//----------------------------------------------------------------

import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { authConnector } from "@web3modal/wagmi";
import { cookieStorage, createStorage } from "wagmi";
import { mainnet, arbitrum, base, sepolia } from "wagmi/chains";

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

export const metadata = {
  name: "Tre",
  description: "Kunat AI",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"]
};

// Create wagmiConfig
const chains = [mainnet, arbitrum, base, sepolia];
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  auth: {
    email: true, // default to true
    // socials: [],
    showWallets: true, // default to true
    walletFeatures: false // default to true
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  })
});
