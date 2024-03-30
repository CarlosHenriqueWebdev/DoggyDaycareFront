import { ApolloClient, InMemoryCache } from '@apollo/client';
import { API_BASE_URL } from './config';

const client = new ApolloClient({
  uri: API_BASE_URL + "/graphql", // URL: endpoint/graphql
  cache: new InMemoryCache()
});

export default client;
