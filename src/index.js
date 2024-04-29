import React from "react";
import ReactDOM from "react-dom/client";
import App from "Containers/App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../src/Redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import actionCable from "actioncable";
import "react-loading-skeleton/dist/skeleton.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CableApp = {};
CableApp.cable = actionCable.createConsumer("ws://staging.memee.app/cable");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <GoogleOAuthProvider clientId="633610376912-pm1g8qjlufvrdfci1tj2jitupdg426n1.apps.googleusercontent.com">
        <React.StrictMode>
          <App />
          <ToastContainer position="top-right" autoClose={2000} />
        </React.StrictMode>
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);
