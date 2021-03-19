import bcrypt from 'bcrypt'
import { BCryptAdapter } from './BCryptAdapter'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

describe('BCrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BCryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_payload')
    expect(hashSpy).toHaveBeenCalledWith('any_payload', salt)
  })

  test('should return a hash on success', async () => {
    const salt = 12
    const sut = new BCryptAdapter(salt)
    const hash = await sut.encrypt('any_payload')
    expect(hash).toBe('hash')
  })
})