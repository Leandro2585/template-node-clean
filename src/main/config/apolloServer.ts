import { Express } from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from '@main/graphql/typedefs'
import resolvers from '@main/graphql/resolvers'

export default (app: Express): void => {
  const server = new ApolloServer({
    resolvers,
    typeDefs
  })

  server.applyMiddleware({ app })
}
