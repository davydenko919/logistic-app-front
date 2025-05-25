import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


// axios.defaults.baseURL = "https://logistic-app-wchv.onrender.com/"; 
axios.defaults.baseURL = "http://localhost:8080/";


// GET /trips?startDate=&endDate=&page=&perPage=&sortBy=&sortOrder=&truckTrip=
export const getTrips = createAsyncThunk(
  "trips/fetchAll",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get("/trips", { params });
      return response.data.data; // trips array
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// GET /trips/:id
export const getTrip = createAsyncThunk(
  "trips/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/trips/${id}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// POST /trips
export const postTrip = createAsyncThunk(
  "trips/create",
  async (tripData, thunkAPI) => {
    try {
      const response = await axios.post("/trips", tripData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// PUT /trips/:id
export const putTrip = createAsyncThunk(
  "trips/update",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`/trips/${id}`, updatedData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// DELETE /trips/:id
export const deleteTrip = createAsyncThunk(
  "trips/delete",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/trips/${id}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);