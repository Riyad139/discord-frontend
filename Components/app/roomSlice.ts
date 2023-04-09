import { createSlice } from "@reduxjs/toolkit";

interface IactiveRoom {
  username: string;
  email: string;
}

export interface IInitState {
  isUserInRoom: boolean;
  isUserRoomCreator: boolean;
  roomDetails: null | any[];
  activeRooms: IactiveRoom[];
  localStram: any;
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
    joinRoom(state, actions) {
      state.audioOnly = actions.payload;
      state.isUserInRoom = true;
      console.log(actions.payload);
    },

    leaveRoom(state) {
      state.isUserInRoom = false;
      state.isUserRoomCreator = false;
      if (state.localStram) {
        state.localStram.getTracks().forEach((track: any) => {
          track.stop();
        });
      }
    },
    setRoomDetails(state, actions) {
      state.roomDetails = actions.payload;
    },
    setMode(state, actions) {
      state.audioOnly = actions.payload;
    },
    setActiveRoom(state, actions) {
      state.activeRooms = actions.payload;
    },
    setRemoteStream(state, actions) {
      state.remoteStreams = actions.payload;
    },
    setLocalStream(state, actions) {
      if (state.localStram) {
        state.localStram.getTracks().forEach((track: any) => {
          track.stop();
        });
      }
      state.localStram = actions.payload;
    },
  },
});

export const {
  createRoom,
  setRoomDetails,
  setActiveRoom,
  leaveRoom,
  setLocalStream,
  setMode,
  joinRoom,
  setRemoteStream,
} = roomSlice.actions;

export default roomSlice.reducer;
