import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import BackDrop from "../BackDrop";
import CreateRoomDialog from "./createRoomDialog";
export default function CreateRoom() {
  const [isOpen, setOpen] = useState(false);
  const Handler = () => {
    setOpen(true);
  };
  const handlerClose = () => {
    setOpen((val) => !val);
  };

  return (
    <div>
      <BackDrop
        open={isOpen}
        handleClose={handlerClose}
        Component={<CreateRoomDialog closeHandler={handlerClose} />}
      />

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
