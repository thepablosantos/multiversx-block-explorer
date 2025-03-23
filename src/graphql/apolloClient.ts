// Se quiser usar GraphQL, mas como não tem no projeto ainda:
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://your-graphql-endpoint.com/graphql",
  cache: new InMemoryCache(),
});

export default client;