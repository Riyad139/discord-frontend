import { Button, TextField } from "@mui/material";

export default function InvitationSystem() {
  return (
    <div className="bg-white w-[31rem] pb-4 text-sm space-y-4 px-4 py-2 rounded-lg flex flex-col text-gray-500">
      <p>Invite a friend</p>
      <p>Enter a user email adress to invite :</p>
      <TextField
        type={"email"}
        id="outlined-basic"
        label="Email"
        variant="outlined"
      />
      <Button className="bg-blue-500 hover:bg-blue-600 text-white">
        add Friend
      </Button>
    </div>
  );
}
