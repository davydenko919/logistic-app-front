import { createSlice } from "@reduxjs/toolkit";
import {
  getAdminTrips,
  getAdminTrip,
  // postAdminTrip,
  putAdminTrip,
  deleteAdminTrip,
} from "./operations";
import { logOut } from "../auth/operations";

const adminTripsSlice = createSlice({
  name: "admintrips",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // GET all trips
      .addCase(getAdminTrips.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAdminTrips.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.trips || action.payload; // handle both array or paginated object
        state.error = null;
      })
      .addCase(getAdminTrips.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // GET trip by ID (can be used to update or show in form)
      .addCase(getAdminTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        const updated = action.payload;
        const index = state.items.findIndex(t => t._id === updated._id);
        if (index >= 0) {
          state.items[index] = updated;
        } else {
          state.items.push(updated);
        }
        state.error = null;
      })
      .addCase(getAdminTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // POST new trip
      // .addCase(postAdminTrip.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(postAdminTrip.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.items.push(action.payload);
      //   state.error = null;
      // })
      // .addCase(postAdminTrip.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload;
      // })

      // PUT update trip
      .addCase(putAdminTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(putAdminTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(t => t._id === action.payload._id);
        if (index >= 0) {
          state.items[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(putAdminTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // DELETE trip
      .addCase(deleteAdminTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAdminTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(t => t._id !== action.payload._id);
        state.error = null;
      })
      .addCase(deleteAdminTrip.rejected, (state, action) => {
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

export default adminTripsSlice.reducer;