import { createSlice } from "@reduxjs/toolkit";

export interface IInitState {
  isUserInRoom: boolean;
  isUserRoomCreator: boolean;
  roomDetails: null | any[];
  activeRooms: any[];
  localStram: null | string;
  remoteStreams: any[];
  audioOnly: boolean;
  screenSharingStream: null | string;
  isScreensharingActive: boolean;
}

export const initialStateRoom: IInitState = {
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
  initialState: initialStateRoom,
  reducers: {
    createRoom(state) {
      state.isUserInRoom = true;
      state.isUserRoomCreator = true;
    },
    setRoomDetails(state, actions) {
      state.roomDetails = actions.payload;
    },
  },
});

export const { createRoom, setRoomDetails } = roomSlice.actions;

export default roomSlice.reducer;
