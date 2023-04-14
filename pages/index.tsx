import { IState } from "@/@types/IState";
import { signinUsingToken } from "@/Components/app/authSlice";
import ChatComponent from "@/Components/ChatComponent/ChatComponent";
import DashBoard from "@/Components/DashBoard/DashBoard";
import NavBar from "@/Components/NavBar";
import Room from "@/Components/Room/Room";
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
  useEffect(() => {
    if (!user) {
      dispatch(signinUsingToken());
    }
    if (user) {
      connetWithSocketIo(user);
    }
  }, [user]);

  return (
    <div className="flex h-[100vh] ">
      <SideBar />
      <SeceondarySideBar />
      <DashBoard />
    </div>
  );
}
