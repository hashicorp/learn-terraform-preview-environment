import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

let publicApiUrl = "http://localhost:8080"

if (process.env.NEXT_PUBLIC_PUBLIC_API_URL) {
  publicApiUrl = process.env.NEXT_PUBLIC_PUBLIC_API_URL
}

const httpLink = createHttpLink({
  uri: `${publicApiUrl}/api`,
})

console.log(`API: ${publicApiUrl}`)

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem('token'))
  return {
    headers: {
      ...headers,
      Authorization: token ? `${token}` : "",
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const queryFetcher = async (query) => await client.query({ query: query });
const queryVarFetcher = async (q) => await client.query({
  query: q.query,
  variables: q.variables
});
const mutationFetcher = async (q) => await client.mutate({
  mutation: q.mutation,
  variables: q.variables
});

export {
  client,
  queryFetcher,
  queryVarFetcher,
  mutationFetcher
};
