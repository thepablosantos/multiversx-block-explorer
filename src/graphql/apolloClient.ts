import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://graph.multiversx.com/graphql", // endpoint oficial da MultiversX
  cache: new InMemoryCache(),
});