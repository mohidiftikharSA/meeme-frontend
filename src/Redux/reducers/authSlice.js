// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  authenticated: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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

// Action creators are generated for each case reducer function
export const { authSuccess,logout } = authSlice.actions;

export default authSlice.reducer;
