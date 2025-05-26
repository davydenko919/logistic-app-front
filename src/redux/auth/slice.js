import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut } from "./operations";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: {
        name: null,
        email: null,
        _id: null,
        },
        token: null,
        isLoggedIn: false,
    },
    extraReducers: builder => builder.addCase(logIn.fulfilled, (state, actions) => {
        state.user.name = actions.payload.data.name;
        state.user.email = actions.payload.data.email;
        state.user._id = actions.payload.data._id;
        state.token = actions.payload.data.accessToken;
        state.isLoggedIn = true;
    }).addCase(logOut.fulfilled, (state) => {
        state.user = {
        name: null,
        email: null,
        _id: null,
        };
        state.token = null;
        state.isLoggedIn = false;

    })
});

export default authSlice.reducer;