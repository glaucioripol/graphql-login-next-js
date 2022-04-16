import { UserLogged } from "shared/types";
import { GlobalStateActionTypes } from "./GlobalState.types";

export const setLoading = () => ({
  type: GlobalStateActionTypes.SET_LOADING,
});

export const setError = (errorMessage: string) => ({
  type: GlobalStateActionTypes.SET_ERROR,
  payload: errorMessage,
});

export const setLoggedIn = (user: UserLogged) => ({
  type: GlobalStateActionTypes.SET_LOGGED_IN,
  payload: user,
});

export const setLoggedOut = () => ({
  type: GlobalStateActionTypes.SET_LOGGED_OUT,
});
