import { ICInvitation } from "@/Components/app/friendSlice";
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
    messages: string[];
  };
}
