import { Reducer } from "@reduxjs/toolkit";

export interface IState {
  Auth: { user: string; loading: boolean; error: undefined | string };
}
