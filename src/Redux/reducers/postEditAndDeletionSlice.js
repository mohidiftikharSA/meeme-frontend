// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postId: null,
    post: {},
    action: ''
};

export const postEditAndDeletionSlice = createSlice({
    name: "postDeletion",
    initialState,
    reducers: {
        setDeletedPostId: (state, action) => {
            state.postId = action.payload.postId;
            state.action = 'delete';
        },
        setEditedPost: (state, action) => {
            state.postId = action.payload.postId;
            state.post = action.payload.post;
            state.action = 'edit';
        },
    },
});

export const { setDeletedPostId , setEditedPost } = postEditAndDeletionSlice.actions;

export default postEditAndDeletionSlice.reducer;
