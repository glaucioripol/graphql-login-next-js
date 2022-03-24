import "../public/styles/globals.css";
import type { AppProps } from "next/app";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export const graphqlClient = new ApolloClient({
  uri: "api/graphql",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={graphqlClient}>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default MyApp;
