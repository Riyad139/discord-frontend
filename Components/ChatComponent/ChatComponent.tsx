import { IState } from "@/@types/IState";
import { IUser } from "@/@types/IUser";
import { Avatar, TextField } from "@mui/material";
import { TextInput } from "evergreen-ui";
import { useSelector } from "react-redux";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${
      name.split(" ").length > 1 ? name.split(" ")[0][0] : name.charAt(0)
    }${
      name.split(" ").length > 1
        ? name.split(" ")[1][0]
        : name.charAt(name.length - 1)
    }`,
  };
}

export default function ChatComponent(props: { userId: IUser }) {
  return (
    <div className="flex flex-col justify-between w-full px-5 py-9 h-full">
      <div className="w-full flex items-center gap-4">
        <Avatar
          className="w-28 h-28 text-[30px] uppercase"
          {...stringAvatar(props.userId.username)}
        />
        <p className="text-2xl">{props.userId.username}</p>
      </div>
      <div>
        <TextInput
          width={"100%"}
          height={50}
          border="none"
          className="!bg-[#525252] !px-5 !text-gray-300 !border-none focus:!shadow-none !focus:border-none  !rounded-full"
          placeholder={"Message @" + props.userId.username}
        />
      </div>
    </div>
  );
}
