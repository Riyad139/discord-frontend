import { IState } from "@/@types/IState";
import { IUser } from "@/@types/IUser";
import { Avatar } from "@mui/material";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { TextInput } from "evergreen-ui";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessages } from "../app/chatSlice";
import ChatBox from "./ChatBox";

import { stringAvatar } from "./../User/UserBox";

export default function ChatComponent(props: { userId: IUser }) {
  const disPatch = useDispatch<ThunkDispatch<any, any, any>>();
  const content = useRef<HTMLInputElement>();
  const messages = useSelector((state: IState) => state.chat.messages);

  const scroll = useRef<null | HTMLElement>(null);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
    console.log(scroll.current);
    console.log(1);
  }, [messages]);

  const submitHandler = (event: any) => {
    if (
      event.key == "Enter" &&
      content.current?.value &&
      content.current?.value.length > 0
    ) {
      const data = {
        reciverId: props.userId._id,
        content: content.current.value,
      };
      disPatch(sendMessages(data));
      content.current.value = "";
    }
  };
  return (
    <div className="flex flex-col  justify-between w-full px-5 py-9 h-full">
      <div className="w-full flex flex-col  gap-4">
        <div className="flex items-center gap-3">
          <Avatar
            className="w-20 h-20 text-[30px] uppercase"
            {...stringAvatar(props.userId.username)}
          />
          <p className="text-2xl">{props.userId.username}</p>
        </div>
        <div className="overflow-y-scroll h-[65vh]">
          {(messages?.perticipant[0] == props.userId._id ||
            messages?.perticipant[1] == props.userId._id) &&
            messages.conversation.map((cv) => <ChatBox conversation={cv} />)}
          <div
            //@ts-ignore
            ref={scroll}
          />
        </div>
      </div>
      <div>
        <TextInput
          width={"100%"}
          height={50}
          //@ts-ignore
          ref={content}
          onKeyDown={submitHandler}
          border="none"
          className="!bg-[#525252] !px-5 !text-gray-300 !border-none focus:!shadow-none !focus:border-none  !rounded-full"
          placeholder={"Message @" + props.userId.username}
        />
      </div>
    </div>
  );
}
