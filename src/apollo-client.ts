import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.multiversx.com/graphql', // Substitua pela URL correta da sua API GraphQL
  cache: new InMemoryCache(),
});

export default client; 