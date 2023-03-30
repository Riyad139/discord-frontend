import { Fab } from "@mui/material";
import { MdGroups } from "react-icons/md";
import CreateRoom from "../CreateRoom/CreateRoom";
export default function () {
  return (
    <div className="bg-dark h-full flex flex-col items-center  ">
      <Fab
        className=" bg-mediumBluish bg-blue rounded-2xl hover:bg-mediumBluish mt-3 mr-2 w-14 h-14 "
        aria-label="add"
      >
        <MdGroups size={28} color="white" />
      </Fab>
      <CreateRoom />
    </div>
  );
}
