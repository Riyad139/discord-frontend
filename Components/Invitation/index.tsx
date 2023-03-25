import { Button } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendFriendInvation } from "../app/friendSlice";
import BackDrop from "../BackDrop";
import InvitationSystem from "./InviteSystem";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { IState } from "@/@types/IState";

export default function AddFriend() {
  const [open, setOpen] = useState(false);
  const handlerClose = () => setOpen(false);
  const email = useRef<HTMLInputElement | null>();

  const Dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const submitHandler = () => {
    if (
      email.current?.value.includes("@") &&
      email.current?.value.includes(".com")
    ) {
      Dispatch(
        sendFriendInvation({
          targetEmail: email.current.value,
          closeHandler: handlerClose,
        })
      );
    }
  };
  return (
    <>
      <BackDrop
        open={open}
        handleClose={handlerClose}
        Component={
          <InvitationSystem submitHandler={submitHandler} value={email} />
        }
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
