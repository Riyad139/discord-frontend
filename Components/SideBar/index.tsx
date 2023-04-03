import React from "react";
import { IState } from "@/@types/IState";
import { Fab } from "@mui/material";
import { MdGroups } from "react-icons/md";
import { useSelector } from "react-redux";
import CreateRoom from "../CreateRoom/CreateRoom";
import { joinRoomHanclerEmit } from "@/socketIOClient/connectWithSocketIo";
export default function () {
  const rooms = useSelector((state: IState) => state.room.roomDetails);

  return (
    <div className="bg-dark h-full flex flex-col items-center  ">
      <Fab
        className=" bg-mediumBluish bg-blue rounded-2xl z-0 hover:bg-mediumBluish mt-3 mr-2 w-14 h-14 "
        aria-label="add"
      >
        <MdGroups size={28} color="white" />
      </Fab>

      {rooms?.map((it) => (
        <Fab
          key={it._id}
          onClick={() => joinRoomHanclerEmit({ id: it._id })}
          className=" bg-mediumBluish bg-blue rounded-2xl z-0 hover:bg-mediumBluish mt-3 mr-2 w-14 h-14 "
          aria-label="add"
        >
          <p className="text-white text-lg">
            {it.name[0] + "" + it.name[it.name.length - 1]}
          </p>
        </Fab>
      ))}

      <CreateRoom />
    </div>
  );
}
