import { Button } from "@mui/material";

import { useState } from "react";
import BackDrop from "../BackDrop";
import InvitationSystem from "./InviteSystem";

export default function AddFriend() {
  const [open, setOpen] = useState(false);
  const handlerClose = () => setOpen(false);
  return (
    <>
      <BackDrop
        open={open}
        handleClose={handlerClose}
        Children={<InvitationSystem />}
      />
      <Button
        onClick={() => setOpen(true)}
        className="bg-green-600 w-48 text-white mb-5 hover:!bg-green-700 mt-9 mx-2"
      >
        Add friend
      </Button>
    </>
  );
}
