import {combineReducers} from "redux"
import authReducer from "./authSlice"
import notificationSlice from "./notificationSlice"

export const rootReducer = combineReducers({
    auth: authReducer,
    notifications: notificationSlice,
})