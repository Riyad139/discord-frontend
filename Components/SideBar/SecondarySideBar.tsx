import { IState } from "@/@types/IState";
import { useSelector } from "react-redux";
import AddFriend from "../Invitation";
import UserBox from "../User/UserBox";

const users = [
  {
    username: "sanaullah sani",
    id: "1",
    token: "",
    img: "",
    email: "hoibo kisu ekta",
  },
  {
    username: "Robin",
    token: "",
    img: "",
    id: "2",
    email: "hoibo kisu ekta",
  },
];

export default function SeceondarySideBar() {
  const inviteUser = useSelector(
    (state: IState) => state.friend.IncommingInvitations
  );
  return (
    <div className="h-full flex justify-between flex-col items-center bg-mediumDark px-3">
      <div className="w-full text-center">
        <AddFriend />
        <p className="text-gray-300 text-sm uppercase ">Private messages</p>
        <div className="mt-7 w-full h-[31rem] overflow-auto space-y-4 ">
          {users.map((us) => (
            <UserBox key={us.id} user={us} inviteUser={false} />
          ))}
        </div>
      </div>
      <div className="w-full text-center">
        <p className="text-gray-400 mb-3 uppercase">Invitations</p>
        <div className="pendingfriends w-full h-56 overflow-auto space-y-3 mb-3">
          {inviteUser.map((us: any) => (
            <UserBox key={us._id + "ad"} user={us} inviteUser={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
