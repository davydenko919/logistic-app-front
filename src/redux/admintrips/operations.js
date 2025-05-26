import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


// axios.defaults.baseURL = "https://logistic-app-wchv.onrender.com/"; 
axios.defaults.baseURL = "http://localhost:8080/";


// GET /admintrips?startDate=&endDate=&page=&perPage=&sortBy=&sortOrder=&truckTrip=
export const getAdminTrips = createAsyncThunk(
  "admintrips/fetchAll",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get("admintrips", { params });
      return response.data.data; // trips array
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// GET /admintrips/:id
export const getAdminTrip = createAsyncThunk(
  "admintrips/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`admintrips/${id}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// POST /admintrips
// export const postAdminTrip = createAsyncThunk(
//   "admintrips/create",
//   async (tripData, thunkAPI) => {
//     try {
//       const response = await axios.post("admintrips", tripData);
//       return response.data.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// PUT /admintrips/:id
export const putAdminTrip = createAsyncThunk(
  "admintrips/update",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`admintrips/${id}`, updatedData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// DELETE /admintrips/:id
export const deleteAdminTrip = createAsyncThunk(
  "admintrips/delete",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`admintrips/${id}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);