import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  obj: [],
};

export const cardIdSlice = createSlice({
  name: "fetchAllCardID",
  initialState,
  reducers: {
    fetchCardId: (state, action) => {
      //   console.log(action.payload);
      //   state. = action.payload;
      state.obj.push(action.payload);
    },
  },
});

export const { fetchCardId } = cardIdSlice.actions;
export default cardIdSlice.reducer;
