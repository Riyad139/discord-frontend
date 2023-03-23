import { IUser } from "@/@types/IUser";
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
};

export default connetWithSocketIo;
