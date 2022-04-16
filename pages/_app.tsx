import "../public/styles/globals.css";
import type { AppProps } from "next/app";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { GlobalStateProvider } from "client/state";

export const graphqlClient = new ApolloClient({
  uri: "api/graphql",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={graphqlClient}>
    <GlobalStateProvider>
      <Component {...pageProps} />
    </GlobalStateProvider>
  </ApolloProvider>
);

export default MyApp;
