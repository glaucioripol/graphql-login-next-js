import jwt from "jsonwebtoken";
import { configurations } from "shared/configs";

export const createToken = (user: any) =>
  jwt.sign({ user }, configurations.server.jwtSecret as string);

export const verifyToken = (token: string) => {
  const a = jwt.verify(token, configurations.server.jwtSecret as string);
  console.log("🚀 ~ file: jwt.ts ~ line 10 ~ verifyToken ~ a", a);

  return a;
};
