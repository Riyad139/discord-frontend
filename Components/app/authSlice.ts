import { IUser } from "@/@types/IUser";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../Library/apiClient";

export const signIn = createAsyncThunk("auth/user", async (data: any) => {
  const res = await api.post("/user/login", data);
  return res.data;
});

export const signinUsingToken = createAsyncThunk("auth/reuser", async () => {
  const res = await api.get("user/login");
  return res.data;
});

interface Iinit {
  loading: boolean;
  user: IUser | null;
  error: any;
}

const initState: Iinit = {
  loading: false,
  user: null,
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initState,
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
    builder.addCase(signinUsingToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signinUsingToken.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(signinUsingToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "error";
    });
  },

  reducers: {},
});

export default AuthSlice.reducer;
