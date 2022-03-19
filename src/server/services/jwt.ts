import jwt from "jsonwebtoken";
import { configurations } from "shared/configs";

export const createToken = (user: any) =>
  jwt.sign({ user }, configurations.server.jwtSecret as string);

export const verifyToken = (token: string) =>
  jwt.verify(token, configurations.server.jwtSecret as string);
