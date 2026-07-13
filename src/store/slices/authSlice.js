import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const LOGIN_API_URL = "http://localhost/Mywp/wp-json/jwt-auth/v1/token";
// Your new custom endpoint
const REGISTER_API_URL = "http://localhost/Mywp/wp-json/custom/v1/register"; 

// 1. REGISTER THUNK
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await fetch(REGISTER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const cleanMessage = (data.message || "Registration failed").replace(/<[^>]*>/g, "");
        return thunkAPI.rejectWithValue(cleanMessage);
      }

      // Automatically log the user in after successful registration
      await thunkAPI.dispatch(loginUser({ username, password })).unwrap();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 2. EXISTING LOGIN THUNK
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await fetch(LOGIN_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const cleanMessage = (data.message || "Login failed").replace(/<[^>]*>/g, "");
        return thunkAPI.rejectWithValue(cleanMessage);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.user_display_name,
          email: data.user_email,
        })
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN CASES
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.token = action.payload.token;
        state.user = {
          name: action.payload.user_display_name,
          email: action.payload.user_email,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      // REGISTRATION CASES
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;