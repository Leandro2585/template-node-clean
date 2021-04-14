import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '@infra/database/mongodb/helpers/MongoHelper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('POST /signup', () => {
    test('should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'John Doe',
          email: 'johndoe@mail.com',
          password: '123456',
          confirmPassword: '123456'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('should return 200 on login', async () => {
      const password = await hash('123456', 12)
      await accountCollection.insertOne({
        name: 'John Doe',
        email: 'johndoe@mail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'johndoe@mail.com',
          password: '123456'
        })
        .expect(200)
    })
  })
})
