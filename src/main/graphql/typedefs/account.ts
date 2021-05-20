import { gql } from 'apollo-server-express'

export default gql`
  export type Query {
    login (email: String!, password: String!): Account!
  }

  export type Mutation {
    signup (name: String!, email: String!, password: String!, confirmPassword: String!): Account!
  }

  type Account {
    accessToken: String!
    name: String!
  }
`
