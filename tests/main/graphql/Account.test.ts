import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import { MongoHelper } from '@infra/mongodb'
import { makeApolloServer } from './helpers'
import { createTestClient } from 'apollo-server-integration-testing'
import { ApolloServer, gql } from 'apollo-server-express'

let accountCollection: Collection
let apolloServer: ApolloServer

describe('Account GraphQL', () => {
  beforeAll(async () => {
    apolloServer = makeApolloServer()
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('Login Query', () => {
    const loginQuery = gql`
      query login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          accessToken,
          name
        }
      }
    `
    test('should return an Account on valid credentials', async () => {
      const password = await hash('123456', 12)
      await accountCollection.insertOne({
        name: 'John Doe',
        email: 'johndoe@mail.com',
        password
      })
      const { query } = createTestClient({ apolloServer })
      const response: any = await query(loginQuery, {
        variables: {
          email: 'johndoe@mail.com',
          password: '123456'
        }
      })
      expect(response.data.login.accessToken).toBeTruthy()
      expect(response.data.login.name).toBe('John Doe')
    })

    test('should return an UnauthorizedError on invalid credentials', async () => {
      const { query } = createTestClient({ apolloServer })
      const response: any = await query(loginQuery, {
        variables: {
          email: 'johndoe@mail.com',
          password: '123456'
        }
      })
      expect(response.data).toBeFalsy()
      expect(response.errors[0].message).toBe('Unauthorized')
    })
  })
})