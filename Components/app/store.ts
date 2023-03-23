import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import AuthReducer from "./authSlice";
import friendReducer from "./friendSlice";
const store = configureStore({
  reducer: {
    //@ts-ignore
    Auth: AuthReducer,
    friend: friendReducer,
  },
  middleware: [thunkMiddleware],
});

export default store;
