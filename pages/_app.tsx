import { CookiesProvider } from "react-cookie";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/store/store";

import { Alert } from "@/components/Alert/Alert";

import "../assets/styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <CookiesProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Alert />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  </CookiesProvider>
);

export default MyApp;
