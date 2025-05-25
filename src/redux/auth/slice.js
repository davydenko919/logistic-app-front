import { createSlice } from "@reduxjs/toolkit";
import { logIn } from "./operations";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: {
        name: null,
        email: null,
        },
        token: null,
        isLoggedIn: false,
    },
    extraReducers: builder => builder.addCase(logIn.fulfilled, (state, actions) => {
        state.user.name = actions.payload.data.name;
        state.user.email = actions.payload.data.email;
        state.token = actions.payload.data.accessToken;
        state.isLoggedIn = true;
    })
});

export default authSlice.reducer;