export const configurations = {
  server: {
    jwtSecret: process.env.JWT_SECRET,
  },
  client: {
    cookies: {
      options: {
        expires: 1,
        sameSite: "strict",
        secure: true,
      },
    },
  },
};
