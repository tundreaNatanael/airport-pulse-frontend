import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { env } from '../lib/env'

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: env.graphqlUrl }),
  cache: new InMemoryCache(),
})
