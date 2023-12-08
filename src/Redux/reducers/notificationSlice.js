import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    enabled_push_notification: false,
};

export const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        togglePushNotification: (state, action) => {
            state.enabled_push_notification = action.payload.enabled_push_notification
        },
    },
});

export const {togglePushNotification} = notificationSlice.actions;

export default notificationSlice.reducer;
