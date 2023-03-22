import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import api from "../Library/apiClient";

export const signIn = createAsyncThunk("auth/user", async (data: any) => {
  const res = await api.post("/user/login", data);
  return res.data;
});

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });
  },
  //@ts-ignore
  reducers: undefined,
});

export default AuthSlice.reducer;
