import React from "react";
import ReactDOM from "react-dom/client";
import App from "Containers/App";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {store, persistor} from "../src/Redux/store";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import actionCable from 'actioncable'
import 'react-loading-skeleton/dist/skeleton.css'

const CableApp = {}
CableApp.cable = actionCable.createConsumer('ws://staging.memee.app/cable')


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Provider store={store}>
    <PersistGate persistor={persistor}>
        <React.StrictMode>
            <App/>
            <ToastContainer position="top-right" autoClose={2000}/>
        </React.StrictMode>
    </PersistGate>
</Provider>);
