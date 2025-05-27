import { createSlice } from "@reduxjs/toolkit";
import {
  getRefuelings,
  getRefueling,
  postRefueling,
  deleteRefueling,
  putRefueling,
} from "./operations.js";

const refuelingsSlice = createSlice({
  name: "refuelings",
  initialState: {
    items: [],
    current: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(getRefuelings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRefuelings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data.refuelings || action.payload.data;
      })
      .addCase(getRefuelings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // GET ONE
      .addCase(getRefueling.fulfilled, (state, action) => {
        state.current = action.payload.data;
      })

      // POST
      .addCase(postRefueling.fulfilled, (state, action) => {
        state.items.push(action.payload.data);
      })

      // DELETE
      .addCase(deleteRefueling.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id !== action.payload.data._id
        );
      })

      // PUT
      .addCase(putRefueling.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item
        );
      });
  },
});

export default refuelingsSlice.reducer;