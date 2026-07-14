import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// 1. REGISTER THUNK
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const demoUser = {
        name: username,
        email,
      };

      localStorage.setItem("token", "demo-token");

      localStorage.setItem("user", JSON.stringify(demoUser));

      return {
        token: "demo-token",
        user_display_name: username,
        user_email: email,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// 2.  LOGIN THUNK
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username }, thunkAPI) => {
    try {
      const demoUser = {
        name: username,
        email: `${username}@buildie.demo`,
      };

      localStorage.setItem("token", "demo-token");

      localStorage.setItem("user", JSON.stringify(demoUser));

      return {
        token: "demo-token",
        user_display_name: demoUser.name,
        user_email: demoUser.email,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
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
