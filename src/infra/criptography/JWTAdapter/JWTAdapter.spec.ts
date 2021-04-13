import jwt from 'jsonwebtoken'
import { JWTAdapter } from './JWTAdapter'

describe('JWT Adapter', () => {
  test('should calls sign with correct values', async () => {
    const sut = new JWTAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_value' }, 'secret')
  })
})
