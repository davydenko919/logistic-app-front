import { createSlice } from "@reduxjs/toolkit";
import {
  getUsers,
  getUser,
  updateUser
} from "./operations";
import { logOut } from "../auth/operations";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    current: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data || action.payload;
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const updated = action.payload.data;
        state.current = updated;
        const index = state.items.findIndex(u => u._id === updated._id);
        if (index >= 0) {
          state.items[index] = updated;
        } else {
          state.items.push(updated);
        }
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const updated = action.payload.data;
        state.current = updated;
        const index = state.items.findIndex(u => u._id === updated._id);
        if (index >= 0) {
          state.items[index] = updated;
        }
      })

      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.current = null;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default usersSlice.reducer;
