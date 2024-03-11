import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCoins: 0,
};

export const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    coinsBuy: (state, action) => {
      state.allCoins = action.payload;
    },
  },
});

export const { coinsBuy } = coinsSlice.actions;
export default coinsSlice.reducer;
