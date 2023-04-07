import { IState } from "@/@types/IState";
import { IUser } from "@/@types/IUser";
import { createRoomHandlerEmit } from "@/socketIOClient/connectWithSocketIo";
import { Avatar, Button, TextField } from "@mui/material";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRoom } from "../app/roomSlice";
import InviteUser from "./inviteUser";
import getLocalStream from "../utils/videoPreview";
let invitedUser: string[] = [];
export default function CreateRoomDialog(props: { closeHandler: any }) {
  const disPatch = useDispatch();
  const friendList = useSelector((state: IState) => state.friend.friend);
  const roomName = useRef<HTMLInputElement>();

  const createRoomhandler = () => {
    if (!roomName.current?.value.length || roomName.current?.value.length <= 1)
      return;

    const callBack = () => {
      createRoomHandlerEmit({
        name: roomName.current?.value,
        invited: invitedUser,
      });
      disPatch(createRoom());
    };

    getLocalStream(callBack);

    props.closeHandler(false);
  };

  const removeHandler = (id: string) => {
    invitedUser = invitedUser.filter((it) => it != id);
  };

  return (
    <div className="bg-white rounded-md w-[30rem]  py-5 px-3">
      <TextField inputRef={roomName} className="w-full" label="room name" />
      <p className="text-xl mt-5">Invite members:</p>
      {friendList.map((it: IUser) => (
        <InviteUser
          invitedUser={invitedUser}
          username={it.username}
          _id={it._id}
          removeHandler={removeHandler}
          email={""}
          token={undefined}
        />
      ))}
      <Button
        onClick={createRoomhandler}
        className=" mt-6 bg-lightBluish w-full hover:bg-mediumBluish text-white "
      >
        Create Room
      </Button>
    </div>
  );
}
