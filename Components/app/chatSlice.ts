import { IUser } from "@/@types/IUser";
import { createSlice } from "@reduxjs/toolkit";

interface IChatSlice {
  ChatType: string | null;
  ChatDetails: IUser | null;
  messages: string[];
}

const ininitState: IChatSlice = {
  ChatType: null,
  ChatDetails: null,
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState: ininitState,
  reducers: {
    setChatDetails(state, action) {
      state.ChatDetails = action.payload.id;
    },
    setChatType(state, acction) {
      state.ChatType = acction.payload.type;
    },
    setChatMessages(state, acction) {
      state.messages = acction.payload.messages;
    },
  },
});

export const { setChatDetails, setChatMessages, setChatType } =
  chatSlice.actions;

export default chatSlice.reducer;
