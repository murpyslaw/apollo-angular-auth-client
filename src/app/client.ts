import { ApolloClient, createNetworkInterface } from 'apollo-client';

const clientConfig = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3000/api'
  })
});

export function apolloClient(): ApolloClient {
  return clientConfig;
}