import type { PropsWithChildren } from 'react'
import { ApolloProvider } from '@apollo/client/react'
import { apolloClient } from '../graphql/client'

export function AppProviders({ children }: PropsWithChildren) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
