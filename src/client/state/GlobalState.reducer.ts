import { UserLogged } from "shared/types";
import {
  ManagerState,
  ManagerStateAction,
  GlobalStateActionTypes,
} from "./GlobalState.types";

const reducerMap = {
  [GlobalStateActionTypes.SET_LOADING]: (state: ManagerState) => ({
    ...state,
    isLoading: true,
    isError: false,
    errorMessage: "",
  }),
  [GlobalStateActionTypes.SET_ERROR]: (
    state: ManagerState,
    payload: string
  ) => ({
    ...state,
    isLoading: false,
    isError: true,
    errorMessage: payload,
  }),
  [GlobalStateActionTypes.SET_LOGGED_IN]: (
    state: ManagerState,
    payload: UserLogged
  ) => ({
    ...state,
    isLoading: false,
    isError: false,
    isLoggedIn: true,
    user: payload,
  }),
  [GlobalStateActionTypes.SET_LOGGED_OUT]: (state: ManagerState) => ({
    ...state,
    isLoading: false,
    isError: false,
    isLoggedIn: false,
    user: null,
  }),
};

export const appStateReducer = (
  state: ManagerState,
  action: ManagerStateAction
): ManagerState => {
  const currentReducer = reducerMap[action.type];

  return currentReducer ? currentReducer(state, action.payload as any) : state;
};
