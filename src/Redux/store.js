// store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice"; // Import your auth slice reducer

const rootReducer = {
  auth: authReducer, 
};

const store = configureStore({
  reducer: rootReducer,
  // Other store configuration options go here
});

export default store;
