import { prisma } from "server/database/prisma";

import bcrypt from "bcrypt";

export type UserCreate = {
  email: string;
  password: string;
  full_name: string;
  age: number;
  image_url: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

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
      password: await bcrypt.hash(password, 10),
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
  };
};

export const login = async ({ email, password }: UserLogin) => {
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error("Invalid password");
  }

  return user;
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
