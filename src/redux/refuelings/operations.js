import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


// axios.defaults.baseURL = "https://logistic-app-wchv.onrender.com/"; 
axios.defaults.baseURL = "http://localhost:8080/";

export const getRefuelings = createAsyncThunk(
  "refuelings/getAll",
  async (params = {}, thunkAPI) => {
    try {
      const response = await axios.get("/refuelings", { params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getRefueling = createAsyncThunk(
  "refuelings/getOne",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${"/refuelings"}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const postRefueling = createAsyncThunk(
  "refuelings/create",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/refuelings", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteRefueling = createAsyncThunk(
  "refuelings/delete",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${"/refuelings"}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const putRefueling = createAsyncThunk(
  "refuelings/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axios.put(`${"/refuelings"}/${id}`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);