import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/store/store";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/global.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <link rel="icon" type="image/x-icon" href="/64.ico" />
          <link rel="apple-touch-icon" sizes="256x256" href="/256.png" />
          <link rel="apple-touch-icon-precomposed" sizes="256x256" href="/256.png" />
        </Head>
        <div id="blur" />
        <ToastContainer
          bodyClassName="cursor-auto"
          toastClassName="cursor-auto"
          limit={2}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          closeOnClick={false}
        />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
