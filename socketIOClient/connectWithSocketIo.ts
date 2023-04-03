import { IUser } from "@/@types/IUser";
import { setChatMessages } from "@/Components/app/chatSlice";
import {
  addFriendList,
  addFriendRequest,
  addFriendToOnline,
} from "@/Components/app/friendSlice";
import { setRoomDetails } from "@/Components/app/roomSlice";
import store from "@/Components/app/store";
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
    console.log(payload);
  });
};

export const createRoomHandlerEmit = (payload: any) => {
  socket.emit("create-room", payload);
};

export const joinRoomHanclerEmit = (payload: any) => {
  socket.emit("join-room", payload);
};

export default connetWithSocketIo;
