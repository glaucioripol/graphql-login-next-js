import React, {
  createContext,
  FC,
  useCallback,
  useEffect,
  useReducer,
} from "react";

import { CookiesKeys } from "shared/types";
import { cookies, getUserDataByToken } from "client/services";

import { appStateReducer } from "./GlobalState.reducer";
import { AppStateContextType } from "./GlobalState.types";
import * as actions from "./GlobalState.actions";

export const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: "",
  isLoggedIn: false,
  user: null,
};

export const appStateContext = createContext<AppStateContextType>({
  dispatch: () => {},
  state: initialState,
  actions: actions,
});

export const GlobalStateProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  const retrieveUserDataByAuthToken = useCallback(() => {
    const token = cookies.get(CookiesKeys.AUTH_TOKEN);

    if (token) {
      const decodedToken = getUserDataByToken(token);
      dispatch(actions.setLoggedIn(decodedToken));
    }
  }, [dispatch]);

  useEffect(retrieveUserDataByAuthToken, [retrieveUserDataByAuthToken]);

  return (
    <appStateContext.Provider value={{ actions, dispatch, state }}>
      {children}
    </appStateContext.Provider>
  );
};
