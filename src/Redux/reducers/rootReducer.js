import { combineReducers } from "redux"
import authReducer from "./authSlice"

export const rootReducer = combineReducers({
    auth: authReducer,     
})