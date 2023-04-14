import { IUser } from "@/@types/IUser";
import { setChatMessages } from "@/Components/app/chatSlice";
import {
  addFriendList,
  addFriendRequest,
  addFriendToOnline,
} from "@/Components/app/friendSlice";
import {
  createRoom,
  joinRoom,
  leaveRoom,
  setActiveRoom,
  setMode,
  setRoomDetails,
} from "@/Components/app/roomSlice";
import store from "@/Components/app/store";
import getPeerSocketPrepare, {
  handleInCommingSignalingData,
  removeSinglePeerConnection,
} from "@/Components/utils/PeerConnection";
import getLocalStream from "@/Components/utils/videoPreview";
import io, { Socket } from "socket.io-client";
let socket: Socket;
const connetWithSocketIo = (user: IUser) => {
  socket = io(process.env.NEXT_PUBLIC_API as string, {
    auth: {
      token: user.token,
    },
  });

  socket.on("connect", () => {});
  socket.on("friend-request", (payload) => {
    store.dispatch(addFriendRequest(payload.pendingRequest));
  });
  socket.on("friend-list", (payload) => {
    store.dispatch(addFriendList(payload.payload));
  });
  socket.on("online-user", (payload) => {
    store.dispatch(addFriendToOnline(payload.payload));
  });

  socket.on("direct-message", (payload) => {
    store.dispatch(setChatMessages(payload.conversation));
  });
  socket.on("chat-history", (payload) => {
    store.dispatch(setChatMessages(payload.conversation));
  });
  socket.on("room-list", (payload) => {
    store.dispatch(setRoomDetails(payload));
  });
  socket.on("active-room", (payload) => {
    store.dispatch(setActiveRoom(payload.activeUser));
  });
  socket.on("conn-prepare", (payload) => {
    const { connectedUserSocketId } = payload;
    getPeerSocketPrepare(connectedUserSocketId, false);
    socket.emit("conn-init", { connectedUserSocketId: connectedUserSocketId });
  });
  socket.on("conn-init", (data) => {
    const { connectedUserSocketId } = data;
    getPeerSocketPrepare(connectedUserSocketId, true);
  });
  socket.on("conn-signal", (data) => {
    handleInCommingSignalingData(data);
  });
  socket.on("remove-peer-connection", (data) => {
    const { connUserSoc } = data;

    removeSinglePeerConnection(connUserSoc);
  });
};

export const createRoomHandlerEmit = (payload: any) => {
  socket.emit("create-room", payload);
};

export const joinRoomHandlerEmit = (payload: any, mode: boolean) => {
  leaveRoomHandlerEmit();
  store.dispatch(setMode(mode));
  const callBack = () => {
    store.dispatch(joinRoom(mode));
    socket.emit("join-room", payload);
  };
  getLocalStream(callBack);
};

export const leaveRoomHandlerEmit = () => {
  store.dispatch(leaveRoom());
  socket.emit("leave-room");
};

export const sendPeerSignal = (data: any) => {
  socket.emit("conn-signal", data);
};

export default connetWithSocketIo;
