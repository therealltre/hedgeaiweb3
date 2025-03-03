// i18n
import "../locales/i18n";

//mocks
// import "../mocks";

// highlight
import "../utils/highlight";

// scroll bar
// import 'simplebar/src/simplebar.css';
import "simplebar/dist/simplebar.css";

// lightbox
// import 'react-image-lightbox/style.css';

// map
import "mapbox-gl/dist/mapbox-gl.css";

// editor
import "react-quill/dist/quill.snow.css";

// slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// lazy image
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "react-lazy-load-image-component/src/effects/black-and-white.css";

// fullcalendar
// import '@fullcalendar/common/main.min.css';
// import '@fullcalendar/daygrid/main.min.css';

// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
// import "@fullcalendar/timeline/main.css";
// import "@fullcalendar/list/main.css";

import PropTypes from "prop-types";
import cookie from "cookie";
// next
import Head from "next/head";
import App from "next/app";
//
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
// @mui
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import AdapterDateFns from "@mui/x-date-pickers/AdapterDateFns";
// import LocalizationProvider from '@mui/x-date-pickers';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// redux
import { store, persistor } from "../redux/store";
// utils
import { getSettings } from "../utils/settings";
// contexts
import { SettingsProvider } from "../contexts/SettingsContext";
import { CollapseDrawerProvider } from "../contexts/CollapseDrawerContext";
// theme
import ThemeProvider from "../theme";
// components
import Settings from "../components/settings";
// import { ChartStyle } from "../components/chart";
import ProgressBar from "../components/ProgressBar";
import ThemeColorPresets from "../components/ThemeColorPresets";
import NotistackProvider from "../components/NotistackProvider";
import ThemeLocalization from "../components/ThemeLocalization";
import MotionLazyContainer from "../components/animate/MotionLazyContainer";

// import { AuthProvider } from "../contexts/JWTContext";
// import { AuthProvider } from '../provider/auth.provider';

// import { AuthProvider } from '../contexts/Auth0Context';
// import { AuthProvider } from '../contexts/AwsCognitoContext';

// Web3Modal imports
import { cookieToInitialState } from "wagmi"; // added
import { config } from "@/config"; // added
import Web3ModalProvider from "@/contexts/DContext";
import { useEffect, useState } from "react";

// solana imports
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter
  // Add other wallet adapters as needed
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

// ----------------------------------------------------------------------

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  settings: PropTypes.object
};

export default function MyApp(props) {
  const { Component, pageProps, settings } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter()
      // Add other wallet adapters here
    ],
    [network]
  );

  // State to hold the initial state after client-side rendering
  const [initialState, setInitialState] = useState(null);
  // Retrieve initial state for Web3Modal after component mounts (client-side)
  useEffect(() => {
    const cookie = document.cookie; // Get the cookie only on the client
    const state = cookieToInitialState(config, cookie); // Get initial state from cookies
    setInitialState(state); // Set initial state
  }, []);

  if (!initialState) {
    // Wait for initialState to be set (to avoid rendering before it is available)
    return null;
  }
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      {/* <AuthProvider> */}
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <CollapseDrawerProvider>
              <SettingsProvider defaultSettings={settings}>
                <ThemeProvider>
                  <NotistackProvider>
                    <MotionLazyContainer>
                      <ThemeColorPresets>
                        <ThemeLocalization>
                          <ProgressBar />
                          {/* <Web3ModalProvider initialState={initialState}> */}
                          <ConnectionProvider endpoint={endpoint}>
                            <WalletProvider wallets={wallets} autoConnect>
                              <WalletModalProvider>
                                {getLayout(<Component {...pageProps} />)}
                              </WalletModalProvider>
                            </WalletProvider>
                          </ConnectionProvider>
                          {/* </Web3ModalProvider> */}
                        </ThemeLocalization>
                      </ThemeColorPresets>
                    </MotionLazyContainer>
                  </NotistackProvider>
                </ThemeProvider>
              </SettingsProvider>
            </CollapseDrawerProvider>
          </PersistGate>
        </ReduxProvider>
      {/* </AuthProvider> */}
    </>
  );
}

// ----------------------------------------------------------------------

MyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context);

  const cookies = cookie.parse(
    context.ctx.req ? context.ctx.req.headers.cookie || "" : document.cookie
  );

  const settings = getSettings(cookies);

  return {
    ...appProps,
    settings
  };
};
