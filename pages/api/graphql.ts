import type { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { typeDefs, resolvers } from "server/graphql";
import { CookiesKeys } from "shared/types";

export const config = { api: { bodyParser: false } };

type contextParameters = { req: NextApiRequest };
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  context: ({ req }: contextParameters) => {
    const authToken = req.cookies[CookiesKeys.AUTH_TOKEN];

    return { authToken };
  },
});

const startServer = apolloServer.start();

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(request, response);
}
