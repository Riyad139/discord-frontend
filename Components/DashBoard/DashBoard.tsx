import { IState } from "@/@types/IState";
import { useSelector } from "react-redux";
import ChatComponent from "../ChatComponent/ChatComponent";
import Room from "../Room/Room";

export default function DashBoard() {
  const chatInfo = useSelector((state: IState) => state.chat);
  const room = useSelector((state: IState) => state.room);

  return (
    <div className="w-full h-[93.2%] text-gray-200 flex justify-center items-center bg-lightGray">
      {!chatInfo.ChatType && !room.isUserInRoom && (
        <p>To start chating - selecet a converstion</p>
      )}
      {chatInfo.ChatType && !room.isUserInRoom && chatInfo.ChatDetails && (
        <ChatComponent userId={chatInfo.ChatDetails} />
      )}
      {room.isUserInRoom && <Room />}
    </div>
  );
}
