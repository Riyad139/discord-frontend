import { IUser } from "@/@types/IUser";
import {
  addFriendList,
  addFriendRequest,
  addFriendToOnline,
} from "@/Components/app/friendSlice";
import store from "@/Components/app/store";
import io from "socket.io-client";

const connetWithSocketIo = (user: IUser) => {
  const socket = io(process.env.NEXT_PUBLIC_API as string, {
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
};

export default connetWithSocketIo;
