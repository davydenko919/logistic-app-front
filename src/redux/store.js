import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice.js";
import tripsReducer from "./trips/slice.js";
import adminTripsSlice from "./admintrips/slice.js";
import usersSlice from "./users/slice.js";
import carsSlice from "./cars/slice.js";
import refuelingsReducer from "./refuelings/slice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trips: tripsReducer,
    admintrips: adminTripsSlice,
    users: usersSlice,
    cars: carsSlice,
    refuelings: refuelingsReducer,
  }
});