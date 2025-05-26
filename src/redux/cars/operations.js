import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


// axios.defaults.baseURL = "https://logistic-app-wchv.onrender.com/"; 
axios.defaults.baseURL = "http://localhost:8080/";


// GET /cars
export const getCars = createAsyncThunk(
  "cars/fetchAll",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get("cars");
      return response.data.data; // users array
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
