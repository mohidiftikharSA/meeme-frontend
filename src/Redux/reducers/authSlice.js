import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSucess: (state, { playload: { accessToken } }) => {
      state.accessToken = accessToken;
      // state.user = user;
    },
  },
});

// Action creators are generated for each case reducer function
export const { authSucess, } = auth.actions;

export default auth.reducer;
