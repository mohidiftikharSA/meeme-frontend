import { combineReducers } from "redux";
import authReducer from "./authSlice";
import notificationSlice from "./notificationSlice";
import searchTagData from "./searchTagData";
import coinsSlice from "./buyCoins";

export const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationSlice,
  searchTagData: searchTagData,
  coins: coinsSlice,
});
