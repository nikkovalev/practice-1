import type { AppProps } from "next/app";
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
        <div className="blur"></div>
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
