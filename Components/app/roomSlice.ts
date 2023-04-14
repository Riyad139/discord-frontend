import { createSlice } from "@reduxjs/toolkit";
import { stopAllPeerConnection } from "../utils/PeerConnection";

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
  screenSharingStream: any;
  isScreensharingActive: boolean;
  sendStreamData: any;
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
  sendStreamData: null,
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
      state.isScreensharingActive = false;
      state.screenSharingStream = null;
      stopAllPeerConnection();
      if (state.localStram) {
        state.localStram.getTracks().forEach((track: any) => {
          track.stop();
        });
      }
      if (state.screenSharingStream) {
        state.screenSharingStream.getTracks().forEach((track: any) => {
          track.stop();
        });
      }
      state.remoteStreams = [];
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
    setScreenShare(state, actions) {
      state.isScreensharingActive = !state.isScreensharingActive;
      state.screenSharingStream = actions.payload;
    },
    setLocalStream(state, actions) {
      if (state.localStram) {
        state.localStram.getTracks().forEach((track: any) => {
          track.stop();
        });
      }
      state.localStram = actions.payload;
      state.sendStreamData = actions.payload;
    },
    setSendData(state, actions) {
      state.sendStreamData = actions.payload;
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
  setScreenShare,
  setSendData,
} = roomSlice.actions;

export default roomSlice.reducer;
