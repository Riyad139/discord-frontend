import { IUser } from "@/@types/IUser";
import { Avatar, Badge, styled } from "@mui/material";
import { BsCheck2, BsXLg } from "react-icons/bs";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { setChatDetails, setChatType } from "../app/chatSlice";
import { ICInvitation, rejectFriendRequest } from "../app/friendSlice";
import api from "../Library/apiClient";
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

const OnlineStyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#228B22",
    color: "#228B22",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",

      border: "0.5px solid currentColor",
      content: '""',
    },
  },
}));
const OfflineStyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#3B3B3B",
    color: "#3B3B3B",
    boxShadow: `0 0 0 3px #979797`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",

      border: "px solid currentColor",
      content: '""',
    },
  },
}));

export default function UserBox(props: {
  invitation: ICInvitation | null;
  user: IUser | null;
  inviteUser: boolean;
  rejectHandler: any;
  acceptHandler: any;
  onlineUser: Map<string, string>;
}) {
  const reject = () => {
    props.rejectHandler(props.invitation?._id);
  };
  const accept = () => {
    props.acceptHandler(props.invitation?._id);
  };
  const disPatch = useDispatch();

  const DirectChatHandler = () => {
    disPatch(setChatType({ type: "DIRECT" }));
    disPatch(setChatDetails({ id: props.user }));
  };

  return (
    <div
      onClick={DirectChatHandler}
      className="flex px-3 py-1 cursor-pointer hover:bg-dark w-full justify-between items-center "
    >
      <div className="flex items-center gap-x-2">
        {!props.inviteUser &&
          props.user &&
          props.onlineUser.has(props.user._id) && (
            <OnlineStyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar {...stringAvatar(props.user.username)} />
            </OnlineStyledBadge>
          )}
        {!props.inviteUser &&
          props.user &&
          !props.onlineUser.has(props.user._id) && (
            <OfflineStyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar {...stringAvatar(props.user.username)} />
            </OfflineStyledBadge>
          )}

        {props.inviteUser && props.invitation && (
          <Avatar {...stringAvatar(props.invitation.Sender.username)} />
        )}

        {props.inviteUser && props.invitation && (
          <p className="text-sm text-gray-200">
            {props.invitation.Sender.username}
          </p>
        )}

        {!props.inviteUser && props.user && (
          <p className="text-sm text-gray-200">{props.user.username}</p>
        )}
      </div>
      {props.inviteUser && (
        <div className="text-gray-200 gap-x-2 flex">
          <BsCheck2 onClick={accept} className="cursor-pointer" size={23} />
          <BsXLg onClick={reject} className="cursor-pointer" size={21} />
        </div>
      )}
    </div>
  );
}
