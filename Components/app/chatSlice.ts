import { IUser } from "@/@types/IUser";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Library/apiClient";

interface IChatSlice {
  ChatType: string | null;
  ChatDetails: IUser | null;
  messages: IMessages | null;
}

export interface IConversation {
  author: IUser;
  _id: string;
  content: string;
  Date: Date;
  type: string;
}

export interface IMessages {
  _id: string;
  perticipant: string[];
  conversation: IConversation[];
}

const ininitState: IChatSlice = {
  ChatType: null,
  ChatDetails: null,
  messages: null,
};

export const sendMessages = createAsyncThunk(
  "chat/sendMessages",
  async (payload: any) => {
    const res = await api.post("/chat/sendMesssage", payload);
    return res.data;
  }
);

export const sendChatHistory = createAsyncThunk(
  "chat/history",
  async (payload: any) => {
    const res = await api.post("/chat/chat-history", payload);

    return res.data;
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: ininitState,
  extraReducers: (builder) => {
    builder.addCase(sendMessages.fulfilled, (state, action) => {
      console.log("success");
    });
    builder.addCase(sendMessages.rejected, (state, action) => {
      console.log("error");
    });
    builder.addCase(sendChatHistory.fulfilled, (state, action) => {});
    builder.addCase(sendChatHistory.rejected, (state, action) => {});
  },
  reducers: {
    setChatDetails(state, action) {
      state.ChatDetails = action.payload.id;
    },
    setChatType(state, acction) {
      state.ChatType = acction.payload.type;
    },
    setChatMessages(state, acction) {
      state.messages = acction.payload;
    },
    setResetChat(state) {
      state.ChatDetails = null;
      state.ChatType = null;
      state.messages = null;
    },
  },
});

export const { setChatDetails, setChatMessages, setChatType, setResetChat } =
  chatSlice.actions;

export default chatSlice.reducer;
