import { IMessages } from "@/Components/app/chatSlice";
import { ICInvitation } from "@/Components/app/friendSlice";
import { IInitState } from "@/Components/app/roomSlice";
import { Reducer } from "@reduxjs/toolkit";
import { IUser } from "./IUser";

export interface IState {
  Auth: { user: IUser; loading: boolean; error: undefined | string };
  friend: {
    friend: IUser[];
    invitation: string[];
    onlineFriend: string[];
    IncommingInvitations: ICInvitation[];
  };
  chat: {
    ChatType: string | null;
    ChatDetails: IUser | null;
    messages: IMessages | null;
  };
  room: IInitState;
}
