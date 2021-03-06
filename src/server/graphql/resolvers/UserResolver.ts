import { UserRepository } from "server/repositories";
import { UserCreate, UserLogin } from "shared/types";

export const UserResolvers = {
  Query: {
    userProfile: (_: any, { id }: { id: string }) =>
      UserRepository.findUserById(id),
    users: () => UserRepository.findAllUsers(),
  },
  Mutation: {
    createUser: (_: any, { input }: { input: UserCreate }) =>
      UserRepository.createUser(input),
    login: (_: any, { email, password }: UserLogin) =>
      UserRepository.login({ email, inputPassword: password }),
  },
};
