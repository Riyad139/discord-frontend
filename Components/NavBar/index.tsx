import { IState } from "@/@types/IState";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function NavBar() {
  const chatInfo = useSelector((state: IState) => state.chat);

  return (
    <div className="w-full flex justify-between items-center px-5 bg-lightGray h-16 border-b-2 border-dark">
      {chatInfo.ChatType && chatInfo.ChatDetails && (
        <p className="text-gray-300">@{chatInfo.ChatDetails?.username}</p>
      )}
      <BsThreeDotsVertical cursor={"pointer"} color="white" size={20} />
    </div>
  );
}
