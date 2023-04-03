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

export default function SeceondarySideBar() {
  const inviteUser = useSelector(
    (state: IState) => state.friend.IncommingInvitations
  );
  const onLine = useSelector((state: IState) => state.friend.onlineFriend);
  const friends = useSelector((state: IState) => state.friend.friend);

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
    <div className="h-full flex justify-between flex-col items-center bg-mediumDark ">
      <div className="w-full text-center">
        <AddFriend />
        <p className="text-gray-300 text-sm uppercase ">Private messages</p>
        <div className="mt-7 w-full h-[31rem] overflow-auto space-y-4 ">
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
      <div className="w-full text-center">
        <p className="text-gray-400 mb-3 text-sm uppercase">Invitations</p>
        <div className="pendingfriends w-full h-56 overflow-auto space-y-3 mb-3">
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
