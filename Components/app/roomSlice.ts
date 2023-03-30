import { createSlice } from "@reduxjs/toolkit";

export interface IInitState {
  isUserInRoom: boolean;
  isUserRoomCreator: boolean;
  roomDetails: null | string;
  activeRooms: any[];
  localStram: null | string;
  remoteStreams: any[];
  audioOnly: boolean;
  screenSharingStream: null | string;
  isScreensharingActive: boolean;
}

const initialState: IInitState = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  roomDetails: null,
  activeRooms: [],
  localStram: null,
  audioOnly: false,
  screenSharingStream: null,
  remoteStreams: [],
  isScreensharingActive: false,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    createRoom(state) {
      state.isUserInRoom = true;
      state.isUserRoomCreator = true;
    },
  },
});

export const { createRoom } = roomSlice.actions;

export default roomSlice.reducer;
