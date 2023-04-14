import React, { useEffect } from "react";
import { IState } from "@/@types/IState";
import { Fab } from "@mui/material";
import { MdGroups } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import CreateRoom from "../CreateRoom/CreateRoom";
import { joinRoomHandlerEmit } from "@/socketIOClient/connectWithSocketIo";
import { setResetChat } from "../app/chatSlice";
export default function () {
  const rooms = useSelector((state: IState) => state.room.roomDetails);
  const disPatch = useDispatch();
  return (
    <div className="bg-dark overflow-auto w-28 sm:w-20 h-full flex flex-col items-center  ">
      <Fab
        onClick={() => disPatch(setResetChat())}
        className=" bg-mediumBluish bg-blue rounded-2xl z-0 hover:bg-mediumBluish mt-3 mr-2 w-14 h-14 "
        aria-label="add"
      >
        <MdGroups size={28} color="white" />
      </Fab>

      {rooms?.map((it) => (
        <Fab
          key={it._id}
          onClick={() => joinRoomHandlerEmit({ id: it._id }, true)}
          className=" bg-mediumBluish bg-blue rounded-2xl z-0 hover:bg-mediumBluish mt-3 mr-2 w-14 h-14 "
          aria-label="add"
        >
          <p className="text-white text-lg">
            {it.name &&
              it.name.length > 2 &&
              it.name[0] + "" + it.name[it.name.length - 1]}
          </p>
        </Fab>
      ))}

      <CreateRoom />
    </div>
  );
}
