import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCoins: 0,
};

export const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    coinsBuy: (state, action) => {
      // console.log(action.payload, "action.Ppayload");
      state.allCoins = action.payload;
      // state.allCoins += action.payload;
    },
    clearCoins: (state) => {
      state.allCoins = initialState.allCoins;
    },
  },
});

export const { coinsBuy, clearCoins } = coinsSlice.actions;
export default coinsSlice.reducer;
