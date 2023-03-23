import { Reducer } from "@reduxjs/toolkit";
import { IUser } from "./IUser";

export interface IState {
  Auth: { user: IUser; loading: boolean; error: undefined | string };
}
