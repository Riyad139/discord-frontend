import SideBar from "@/Components/SideBar";
import SeceondarySideBar from "@/Components/SideBar/SecondarySideBar";
import { BsThreeDotsVertical } from "react-icons/bs";
export default function Home() {
  return (
    <div className=" flex h-[100vh]">
      <div className="h-full w-20 ">
        <SideBar />
      </div>
      <div>
        <SeceondarySideBar />
      </div>
      <div className="w-full h-full">
        <div className="w-full flex flex-row-reverse items-center px-5 bg-lightGray h-16 border-b-2 border-dark">
          <BsThreeDotsVertical cursor={"pointer"} color="white" size={20} />
        </div>
        <div className="w-full h-[93.2%] text-gray-200 flex justify-center items-center bg-lightGray">
          <p>To start chating - selecet a converstion</p>
        </div>
      </div>
    </div>
  );
}
