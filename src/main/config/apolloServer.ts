import { Express } from 'express'
import { GraphQLError } from 'graphql'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from '@main/graphql/typedefs'
import resolvers from '@main/graphql/resolvers'

const handleErrors = (response: any, errors: readonly GraphQLError[]): void => {
  errors?.forEach(error => {
    response.data = undefined
    if (checkError(error, 'UserInputError')) {
      response.status = 400
    } else if (checkError(error, 'AuthenticationError')) {
      response.status = 401
    } else if (checkError(error, 'ForbiddenError')) {
      response.status = 403
    } else {
      response.http.status = 500
    }
  })
}

const checkError = (error: GraphQLError, errorName: string): boolean => {
  return [error.name, error.originalError?.name].some(name => name === errorName)
}

export default (app: Express): void => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    plugins: [{
      requestDidStart: () => ({
        willSendResponse: ({ response, errors }) => handleErrors(response, errors)
      })
    }]
  })

  server.applyMiddleware({ app })
}
