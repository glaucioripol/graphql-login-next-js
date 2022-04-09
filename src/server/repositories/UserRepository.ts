import bcrypt from "bcrypt";
import { prisma } from "server/database/prisma";

import { UserCreate, UserLogin } from "shared/types";

import { createToken } from "server/services/jwt";

export const createUser = async ({
  age,
  email,
  full_name,
  image_url,
  password,
}: UserCreate) => {
  const user = await prisma.user.create({
    data: {
      email,
      password: await bcrypt.hash(password as string, 10),
    },
  });

  const profile = await prisma.profile.create({
    data: {
      user: { connect: { id: user.id } },
      age,
      full_name,
      image_url,
    },
  });

  return {
    ...user,
    profile,
    authToken: createToken(user),
  };
};

export const login = async ({ email, inputPassword }: UserLogin) => {
  const user = await prisma.user.findFirst({
    where: { email },
    select: {
      id: true,
      password: true,
      email: true,
      profile: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isValidPassword = await bcrypt.compare(
    inputPassword as string,
    user.password
  );

  if (!isValidPassword) {
    throw new Error("Invalid password");
  }

  return { ...user, authToken: createToken(user) };
};

export const findUserById = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: { id },
    select: {
      id: true,
      email: true,
      profile: {
        select: {
          id: true,
          age: true,
          full_name: true,
          image_url: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const findAllUsers = () =>
  prisma.user.findMany({
    select: {
      id: true,
      email: true,
      profile: {
        select: {
          id: true,
          age: true,
          full_name: true,
          image_url: true,
        },
      },
    },
  });
