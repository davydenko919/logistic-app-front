import { createSlice } from "@reduxjs/toolkit";
import {
  getTrips,
  getTrip,
  postTrip,
  putTrip,
  deleteTrip,
} from "./operations";
import { logOut } from "../auth/operations";

const tripsSlice = createSlice({
  name: "trips",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // GET all trips
      .addCase(getTrips.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTrips.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.trips || action.payload; // handle both array or paginated object
        state.error = null;
      })
      .addCase(getTrips.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // GET trip by ID (can be used to update or show in form)
      .addCase(getTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrip.fulfilled, (state, action) => {
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
      .addCase(getTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // POST new trip
      .addCase(postTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(postTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // PUT update trip
      .addCase(putTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(putTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(t => t._id === action.payload._id);
        if (index >= 0) {
          state.items[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(putTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // DELETE trip
      .addCase(deleteTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(t => t._id !== action.payload._id);
        state.error = null;
      })
      .addCase(deleteTrip.rejected, (state, action) => {
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

export default tripsSlice.reducer;