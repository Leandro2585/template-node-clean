import { hash } from 'bcrypt'
import request from 'supertest'
import { Collection } from 'mongodb'
import { MongoHelper } from '@infra/mongodb'
import app from '@main/config/app'

let accountCollection: Collection

describe('Account Routes', () => {
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
    test('should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'johndoe@mail.com',
          password: '123456'
        })
        .expect(401)
    })
  })
})
