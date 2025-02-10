// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postId: null
};

export const postDeletionSlice = createSlice({
    name: "postDeletion",
    initialState,
    reducers: {
        setDeletedPostId: (state, action) => {
            state.postId = action.payload.postId;
        },
    },


});

export const { setDeletedPostId } = postDeletionSlice.actions;

export default postDeletionSlice.reducer;
