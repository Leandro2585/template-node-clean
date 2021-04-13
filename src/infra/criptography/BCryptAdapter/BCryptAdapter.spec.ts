import bcrypt from 'bcrypt'
import { BCryptAdapter } from './BCryptAdapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  },

  async compare (): Promise<boolean> {
    return new Promise(resolve => resolve(true))
  }
}))

const salt = 12
const makeSut = (): BCryptAdapter => {
  return new BCryptAdapter(salt)
}

describe('BCrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_payload')
    expect(hashSpy).toHaveBeenCalledWith('any_payload', salt)
  })

  test('should return a valid on hash success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_payload')
    expect(hash).toBe('hash')
  })

  test('should throw if hash throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.hash('any_payload')
    await expect(promise).rejects.toThrow()
  })

  test('should call compare with correct values', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_payload', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_payload', 'any_hash')
  })

  test('should return true when compare succeeds', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_payload', 'any_hash')
    expect(isValid).toBe(true)
  })

  test('should return false when compare fails', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const isValid = await sut.compare('any_payload', 'any_hash')
    expect(isValid).toBe(false)
  })

  test('should throw if compare throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.compare('any_payload', 'any_hash')
    await expect(promise).rejects.toThrow()
  })
})
