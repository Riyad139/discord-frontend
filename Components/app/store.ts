import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice";

const store = configureStore({
  reducer: {
    //@ts-ignore
    Auth: AuthReducer,
  },
});

export default store;
