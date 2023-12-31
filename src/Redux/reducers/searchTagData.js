// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: []
};

export const searchTagData = createSlice({
    name: "searchTagData",
    initialState,
    reducers: {
        setSearchTagData: (state, action) => {
            state.data = action.payload.data;
        },
    },


});

export const { setSearchTagData } = searchTagData.actions;

export default searchTagData.reducer;
