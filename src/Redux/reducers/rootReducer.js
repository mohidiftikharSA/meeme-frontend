import {combineReducers} from "redux"
import authReducer from "./authSlice"
import notificationSlice from "./notificationSlice"
import searchTagData from "./searchTagData"

export const rootReducer = combineReducers({
    auth: authReducer,
    notifications: notificationSlice,
    searchTagData: searchTagData,
})