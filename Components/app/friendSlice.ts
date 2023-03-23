import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Library/apiClient";

interface IInitFriend {
  friend: string[];
  onlineFriend: string[];
  invitation: string[];
}

const initState: IInitFriend = {
  friend: [],
  onlineFriend: [],
  invitation: [],
};

interface Ipayload {
  targetEmail: string;
  closeHandler: any;
}

export const sendFriendInvation = createAsyncThunk(
  "friend/invite",
  async (payload: Ipayload) => {
    const { targetEmail, closeHandler } = payload;
    const res = await api.post("/friend/addFriend", { targetEmail });
    return {
      data: res.data,
      closeHandler,
    };
  }
);

const friendReducer = createSlice({
  name: "friend",
  initialState: initState,
  extraReducers: (builder) => {
    builder.addCase(sendFriendInvation.fulfilled, (state, action) => {
      state.invitation.push(action.payload.data);
      action.payload.closeHandler();
    });
    builder.addCase(sendFriendInvation.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
  reducers: {},
});

export default friendReducer.reducer;
