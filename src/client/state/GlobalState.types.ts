import React from "react";

import { UserLogged } from "shared/types";
import * as actions from "./GlobalState.actions";

export enum GlobalStateActionTypes {
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
  SET_LOGGED_IN = "SET_LOGGED_IN",
  SET_LOGGED_OUT = "SET_LOGGED_OUT",
}

export interface ManagerState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  isLoggedIn: boolean;
  user: UserLogged | null;
}

export interface ManagerStateAction {
  type: GlobalStateActionTypes;
  payload?: string | UserLogged;
}

export interface AppStateContextType {
  state: ManagerState;
  dispatch: React.Dispatch<ManagerStateAction>;
  actions: typeof actions;
}
