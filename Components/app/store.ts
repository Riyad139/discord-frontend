import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import AuthReducer from "./authSlice";
import friendReducer from "./friendSlice";
import chatReducer from "./chatSlice";
const store = configureStore({
  reducer: {
    //@ts-ignore
    Auth: AuthReducer,
    friend: friendReducer,
    chat: chatReducer,
  },
  middleware: [thunkMiddleware],
});

export default store;
