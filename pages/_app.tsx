import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/store/store";

import { Alert } from "@/components/Alert/Alert";

import "../assets/styles/global.scss";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <div className="blur"></div>
      <Alert />
      <Component {...pageProps} />
    </PersistGate>
  </Provider>
);

export default MyApp;
