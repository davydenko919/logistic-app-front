import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// axios.defaults.baseURL = "https://logistic-app-wchv.onrender.com/";
axios.defaults.baseURL = "http://localhost:8080/";

// GET /users — всі користувачі
export const getUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("users");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// GET /users/:id — поточний користувач
export const getUser = createAsyncThunk(
  "users/fetchOne",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`users/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// PUT /users/:id — оновлення користувача
export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`users/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);