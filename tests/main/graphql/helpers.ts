import { ApolloServer } from 'apollo-server-express'
import resolvers from '@main/graphql/resolvers'
import schemaDirectives from '@main/graphql/directives'
import typeDefs from '@main/graphql/typedefs'

export const makeApolloServer = (): ApolloServer => new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives
})