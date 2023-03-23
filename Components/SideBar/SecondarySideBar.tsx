import { Button } from "@mui/material";
import AddFriend from "../Invitation";
import User from "../User/User";

export default function SeceondarySideBar() {
  return (
    <div className="h-full flex flex-col items-center bg-mediumDark px-3">
      <AddFriend />
      <p className="text-gray-300 uppercase text-sm">Private messages</p>
      <div className="mt-7 w-full mx-3 space-y-4 ">
        <User name="Neo bean" img={"null"} email="adad" />
        <User name="John dee" img={"null"} email="adad" />
        <User name="Evaan Mia" img={"null"} email="adad" />
        <User name="Sanaullah sani" img={"null"} email="adad" />
        <User name="Zahid Hasan" img={"null"} email="adad" />
        <User name="Ariful Hridoy" img={"null"} email="adad" />
      </div>
    </div>
  );
}
