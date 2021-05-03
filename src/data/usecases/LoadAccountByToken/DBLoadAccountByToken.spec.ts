import { Decrypter } from '../../protocols/criptography/Decrypter'
import { DBLoadAccountByToken } from './DBLoadAccountByToken'

interface SutTypes {
  sut: DBLoadAccountByToken;
  decrypterStub: Decrypter;
}

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (payload: string): Promise<string> {
      return new Promise(resolve => resolve('any_value'))
    }
  }
  return new DecrypterStub()
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const sut = new DBLoadAccountByToken(decrypterStub)
  return {
    sut,
    decrypterStub
  }
}

describe('DBLoadAccountByToken Usecase', () => {
  test('should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
