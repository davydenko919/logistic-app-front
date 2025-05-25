import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


// axios.defaults.baseURL = "https://logistic-app-wchv.onrender.com/"; 
axios.defaults.baseURL = "http://localhost:8080/";

const setAuthHeader = token => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common["Authorization"] = "";
};

/*
 * POST @ /users/signup
 * body: { name, email, password }
 *
 * After successful registration, add the token to the HTTP header
 */
export const register = createAsyncThunk(
  "auth/register",
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post("auth/register", newUser);
    //   setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /users/login
 * body: { email, password }
 *
 * After successful login, add the token to the HTTP header
 */
export const logIn = createAsyncThunk(
  "auth/login",
  async (userInfo, thunkAPI) => {
    try {
      const response = await axios.post("auth/login", userInfo);
    //   console.log(response.data.data.accessToken);
      
      setAuthHeader(response.data.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 *
 * After a successful logout, remove the token from the HTTP header
 */
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("auth/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});