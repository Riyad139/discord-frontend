import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import AuthReducer from "./authSlice";
import friendReducer from "./friendSlice";
import chatReducer from "./chatSlice";
import roomReducer from "./roomSlice";
const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    friend: friendReducer,
    chat: chatReducer,
    room: roomReducer,
  },
  middleware: [thunkMiddleware],
});

export default store;
