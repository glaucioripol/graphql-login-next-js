import { UserLogged } from "shared/types";

export const getUserDataByToken = (token: string): UserLogged => {
  const [, tokenBody] = token.split(".");

  const tokenBodyDecoded = JSON.parse(window.atob(tokenBody));

  return {
    ...tokenBodyDecoded,
    authToken: token,
  };
};
