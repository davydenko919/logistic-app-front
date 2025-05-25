import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice.js";
import tripsReducer from "./trips/slice.js";



export const store = configureStore({
  reducer: {
    auth: authReducer,
    trips: tripsReducer,
  }
});