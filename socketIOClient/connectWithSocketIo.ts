import { IUser } from "@/@types/IUser";
import { addFriendRequest } from "@/Components/app/friendSlice";
import store from "@/Components/app/store";
import io from "socket.io-client";

const connetWithSocketIo = (user: IUser) => {
  const socket = io(process.env.NEXT_PUBLIC_API as string, {
    auth: {
      token: user.token,
    },
  });

  socket.on("connect", () => {
    console.log("successfully connected");
    console.log(socket.id);
  });
  socket.on("friend-request", (payload) => {
    console.log(payload.pendingRequest);
    store.dispatch(addFriendRequest(payload.pendingRequest));
    console.log(payload.pendingRequest);
  });
};

export default connetWithSocketIo;
