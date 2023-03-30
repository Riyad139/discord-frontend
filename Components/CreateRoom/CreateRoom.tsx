import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { createRoom } from "../app/roomSlice";
export default function CreateRoom() {
  const disPatch = useDispatch();

  const Handler = () => {
    disPatch(createRoom());
  };

  return (
    <div>
      <Fab
        color="primary"
        onClick={Handler}
        className=" bg-mediumBluish z-0 bg-blue rounded-2xl hover:bg-mediumBluish mt-3 mr-2 w-14 h-14 "
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
