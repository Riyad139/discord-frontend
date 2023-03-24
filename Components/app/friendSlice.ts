import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Library/apiClient";

interface IFriend {
  _id: string;
  username: string;
  email: string;
}

interface IInitFriend {
  friend: string[];
  onlineFriend: string[];
  pendingInvitations: string[];
  IncommingInvitations: IFriend[];
}

const initState: IInitFriend = {
  friend: [],
  onlineFriend: [],
  pendingInvitations: [],
  IncommingInvitations: [],
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
      state.pendingInvitations.push(action.payload.data);
      action.payload.closeHandler();
    });
    builder.addCase(sendFriendInvation.rejected, (state, action) => {
      console.log(action.error);
    });
  },
  reducers: {
    addFriendRequest(state, action) {
      action.payload.forEach((obj: any) => {
        state.IncommingInvitations.push(obj.Sender);
      });
    },
  },
});

export const { addFriendRequest } = friendReducer.actions;

export default friendReducer.reducer;
