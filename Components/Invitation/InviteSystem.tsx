import { IState } from "@/@types/IState";
import { Button, TextField } from "@mui/material";
import { MutableRefObject, RefObject } from "react";
import { useSelector } from "react-redux";

export default function InvitationSystem(props: {
  submitHandler: any;
  value: MutableRefObject<HTMLInputElement | null | undefined>;
}) {
  return (
    <div className="bg-white w-[31rem] pb-4 text-sm space-y-4 px-4 py-2 rounded-lg flex flex-col text-gray-500">
      <p>Invite a friend</p>
      <p>Enter a user email adress to invite :</p>
      <TextField
        type={"email"}
        id="outlined-basic"
        label="Email"
        variant="outlined"
        inputRef={props.value}
      />
      <Button
        onClick={props.submitHandler}
        className="bg-blue-500 hover:bg-blue-600 text-white"
      >
        add Friend
      </Button>
    </div>
  );
}
