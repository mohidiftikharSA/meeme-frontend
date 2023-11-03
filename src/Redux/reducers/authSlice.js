// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  authenticated: false,
  profile: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthProfile: (state, action) => {
      state.profile = action.payload.profile
    },
    authSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.authenticated = true
    },
    logout: (state) => {
      state.accessToken = initialState.accessToken
      state.user = initialState.user
      state.authenticated = initialState.authenticated
    }
  },
 

});

export const { authSuccess, logout , setAuthProfile} = authSlice.actions;

export default authSlice.reducer;
