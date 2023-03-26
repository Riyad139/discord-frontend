import { Avatar, Divider } from "@mui/material";
import dayjs from "dayjs";
import { IConversation, IMessages } from "../app/chatSlice";
import { stringAvatar } from "./../User/UserBox";
let author: string = "abcd";
let dateTrack: string = "abcd";
const getTimeFormate = (date: Date) => {
  const day1 = dayjs(date).get("date");
  const day2 = dayjs(new Date()).get("date");
  if (day2 == day1)
    return (
      "Today at " + dayjs(date).format("hh") + ":" + dayjs(date).get("minute")
    );
  if (day2 > day1)
    return (
      "Yesterday at " +
      dayjs(date).format("hh") +
      ":" +
      dayjs(date).get("minute")
    );
  else return dayjs(date).format("MM/DD/YYYY hh:mm");
};

const getDateGroup = (date: Date) => {
  return dayjs(date).format("MMMM DD,YYYY");
};

export default function ChatBox(props: { conversation: IConversation }) {
  const dateGroup = getDateGroup(props.conversation.Date);
  const ui = (
    <div className="my-2 w-full">
      {dateTrack != dateGroup && (
        <Divider className="before:border-gray-500 text-xs text-gray-400  after:border-gray-500">
          {dateGroup}
        </Divider>
      )}
      {(author != props.conversation.author._id || dateGroup != dateTrack) && (
        <div className="flex  items-center gap-2">
          <Avatar {...stringAvatar(props.conversation.author.username)} />
          <p className="text-xl">{props.conversation.author.username}</p>
          <p className="text-xs text-gray-400">
            {getTimeFormate(props.conversation.Date)}
          </p>
        </div>
      )}

      <p className="ml-12 text-sm  ">{props.conversation.content}</p>
    </div>
  );

  author = props.conversation.author._id;
  dateTrack = dateGroup;

  return ui;
}
