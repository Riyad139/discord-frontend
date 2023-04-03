import { IUser } from "@/@types/IUser";
import { Avatar, Button } from "@mui/material";
import { useState } from "react";
import { stringAvatar } from "../User/UserBox";

interface props extends IUser {
  invitedUser: string[];
  removeHandler: any;
}

export default function InviteUser({
  removeHandler,
  username,
  _id,
  invitedUser,
}: props) {
  const [isInvited, setInvited] = useState(false);
  const addInvited = (id: string) => {
    invitedUser.push(id);
    setInvited(true);
  };
  const remove = (id: string) => {
    removeHandler(id);
    setInvited(false);
  };

  return (
    <div className="flex w-full py-2 items-center  ">
      <Avatar {...stringAvatar(username)} />
      <p className="ml-7 mr-auto">{username}</p>
      {!isInvited && (
        <Button
          onClick={() => addInvited(_id)}
          className="bg-lightBluish hover:bg-mediumBluish text-white text-xs"
        >
          Invite
        </Button>
      )}
      {isInvited && (
        <Button
          onClick={() => remove(_id)}
          className="bg-gray-400 hover:bg-gray-600 text-black text-xs"
        >
          cancel
        </Button>
      )}
    </div>
  );
}
