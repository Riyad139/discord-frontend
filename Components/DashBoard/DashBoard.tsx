import { IState } from "@/@types/IState";
import { useSelector } from "react-redux";
import ChatComponent from "../ChatComponent/ChatComponent";
import Room from "../Room/Room";
import NavBar from "../NavBar";
import classNames from "classnames";

export default function DashBoard() {
  const chatInfo = useSelector((state: IState) => state.chat);
  const room = useSelector((state: IState) => state.room);

  return (
    <div
      className={classNames(
        "h-full  w-[85%]",
        chatInfo.ChatType ? "block" : "hidden sm:block"
      )}
    >
      <NavBar />
      <div className="text-gray-200 h-[93%]  flex justify-center items-center bg-lightGray">
        {!chatInfo.ChatType && !room.isUserInRoom && (
          <p>To start chating - selecet a converstion</p>
        )}
        {chatInfo.ChatType && chatInfo.ChatDetails && (
          <ChatComponent userId={chatInfo.ChatDetails} />
        )}
        {room.isUserInRoom && <Room />}
      </div>
    </div>
  );
}
