import { IState } from "@/@types/IState";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  acceptFriendRequest,
  ICInvitation,
  rejectFriendRequest,
} from "../app/friendSlice";
import AddFriend from "../Invitation";
import UserBox from "../User/UserBox";
import classNames from "classnames";

export default function SeceondarySideBar() {
  const inviteUser = useSelector(
    (state: IState) => state.friend.IncommingInvitations
  );
  const onLine = useSelector((state: IState) => state.friend.onlineFriend);
  const friends = useSelector((state: IState) => state.friend.friend);
  const isInChat = useSelector((state: IState) => state.chat.ChatType);
  const disPatch = useDispatch<ThunkDispatch<any, any, any>>();

  const rejectHandler = (id: string) => {
    const data = { requestId: id };
    disPatch(rejectFriendRequest(data));
  };
  const acceptHandler = (id: string) => {
    const data = { requestId: id };
    disPatch(acceptFriendRequest(data));
  };

  const onlineUser = useMemo(() => {
    const map = new Map();
    onLine?.forEach((id) => map.set(id, "online"));
    return map;
  }, [onLine]);

  return (
    <div
      className={classNames(
        "h-full w-full sm:w-56  justify-between flex-col items-center bg-mediumDark ",
        isInChat ? "hidden sm:flex" : "flex"
      )}
    >
      <div className="w-full text-center h-[80%]">
        <AddFriend />
        <p className="text-gray-300 text-sm uppercase ">Private messages</p>
        <div className="mt-7 w-full  overflow-auto space-y-4 ">
          {friends.map((us) => (
            <UserBox
              key={us._id}
              user={us}
              onlineUser={onlineUser}
              invitation={null}
              inviteUser={false}
              rejectHandler={rejectHandler}
              acceptHandler={acceptHandler}
            />
          ))}
        </div>
      </div>
      <div className="w-full text-center h-[20%]">
        <p className="text-gray-400  text-sm uppercase">Invitations</p>
        <div className="pendingfriends w-full  overflow-auto space-y-3 mb-3">
          {inviteUser.map((IN: ICInvitation) => (
            <UserBox
              key={IN._id + "ad"}
              user={null}
              invitation={IN}
              onlineUser={onlineUser}
              inviteUser={true}
              rejectHandler={rejectHandler}
              acceptHandler={acceptHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
