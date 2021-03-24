import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('should return an account on success', async () => {
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
