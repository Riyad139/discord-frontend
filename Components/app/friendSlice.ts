import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Library/apiClient";

interface IFriend {
  _id: string;
  username: string;
  email: string;
}
export interface ICInvitation {
  _id: string;
  Recever: string;
  Sender: IFriend;
}

interface IInitFriend {
  friend: string[];
  onlineFriend: string[];
  pendingInvitations: string[];
  IncommingInvitations: ICInvitation[];
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

export const rejectFriendRequest = createAsyncThunk(
  "friend/reject",
  async (data: any) => {
    const res = await api.post("/friend/reject", data);
    return res;
  }
);

export const acceptFriendRequest = createAsyncThunk(
  "friend/accept",
  async (data: any) => {
    const res = await api.post("/friend/accept", data);
    return res;
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
    builder.addCase(rejectFriendRequest.fulfilled, (state) => {
      state.IncommingInvitations;
    });
    builder.addCase(rejectFriendRequest.rejected, (state) => {
      alert("wrong");
    });
    builder.addCase(acceptFriendRequest.fulfilled, (state) => {});
    builder.addCase(acceptFriendRequest.rejected, (state) => {
      alert("wrong");
    });
  },
  reducers: {
    addFriendRequest(state, action) {
      state.IncommingInvitations = action.payload;
    },
  },
});

export const { addFriendRequest } = friendReducer.actions;

export default friendReducer.reducer;
