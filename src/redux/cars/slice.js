import { createSlice } from "@reduxjs/toolkit";
import {
  getCars,
} from "./operations";
import { logOut } from "../auth/operations";

const carsSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // GET all trips
      .addCase(getCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data || action.payload; // handle both array or paginated object
        state.error = null;
      })
      .addCase(getCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Reset on logout
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default carsSlice.reducer;