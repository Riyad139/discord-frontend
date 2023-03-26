import { IState } from "@/@types/IState";
import { signinUsingToken } from "@/Components/app/authSlice";
import ChatComponent from "@/Components/ChatComponent/ChatComponent";
import SideBar from "@/Components/SideBar";
import SeceondarySideBar from "@/Components/SideBar/SecondarySideBar";
import connetWithSocketIo from "@/socketIOClient/connectWithSocketIo";
import { useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
export default function Home() {
  const user = useSelector((state: IState) => state.Auth.user);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const chatInfo = useSelector((state: IState) => state.chat);
  useEffect(() => {
    if (!user) {
      dispatch(signinUsingToken());
    }
    if (user) {
      connetWithSocketIo(user);
    }
  }, [user]);

  return (
    <div className=" flex h-[100vh]">
      <div className="h-full w-20 ">
        <SideBar />
      </div>
      <div>
        <SeceondarySideBar />
      </div>
      <div className="w-full h-full">
        <div className="w-full flex justify-between items-center px-5 bg-lightGray h-16 border-b-2 border-dark">
          {chatInfo.ChatType && chatInfo.ChatDetails && (
            <p className="text-gray-300">@{chatInfo.ChatDetails?.username}</p>
          )}
          <BsThreeDotsVertical cursor={"pointer"} color="white" size={20} />
        </div>
        <div className="w-full h-[93.2%] text-gray-200 flex justify-center items-center bg-lightGray">
          {!chatInfo.ChatType && (
            <p>To start chating - selecet a converstion</p>
          )}
          {chatInfo.ChatType && chatInfo.ChatDetails && (
            <ChatComponent userId={chatInfo.ChatDetails} />
          )}
        </div>
      </div>
    </div>
  );
}
