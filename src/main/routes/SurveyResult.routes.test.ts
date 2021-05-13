import env from '@main/config/env'
import app from '../config/app'
import request from 'supertest'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import { MongoHelper } from '@infra/database/mongodb/helpers/MongoHelper'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const response = await accountCollection.insertOne({
    name: 'John Doe',
    email: 'johndoe@mail.com',
    password: '123456'
  })
  const id = response.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('SurveyResult Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('PUT /surveys/:surveyId/results', () => {
    test('should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })

    test('should return 200 on save survey result with token', async () => {
      const accessToken = await makeAccessToken()
      const response = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'any_image'
        }, {
          answer: 'Answer 2'
        }],
        date: new Date()
      })
      await request(app)
        .put(`/api/surveys/${response.ops[0]._id}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'Answer 1',
          image: 'any_image'
        })
        .expect(200)
    })
  })

  describe('GET /surveys/:surveyId/results', () => {
    test('should return 403 on load survey result without accessToken', async () => {
      await request(app)
        .get('/api/surveys/any_id/results')
        .expect(403)
    })

    test('should return 200 on load survey result with accessToken', async () => {
      const accessToken = await makeAccessToken()
      const response = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
        }],
        date: new Date()
      })
      await request(app)
        .get(`/api/surveys/${response.ops[0]._id}/results`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
