import { Encrypter } from '../../protocols/encrypter'
import { DBAddAccount } from './DBAddAccount'

interface SutTypes {
  sut: DBAddAccount;
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  class EncrypterStub {
    async encrypt (payload: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_payload'))
    }
  }
  const encrypterStub = new EncrypterStub()
  const sut = new DBAddAccount(encrypterStub)

  return {
    sut,
    encrypterStub
  }
}

describe('DBAddAccount Usecase', () => {
  test('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.create(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
