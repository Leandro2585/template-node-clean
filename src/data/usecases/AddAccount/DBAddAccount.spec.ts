import { DBAddAccount } from './DBAddAccount'

describe('DBAddAccount Usecase', () => {
  test('should call Encrypter with correct password', async () => {
    class EncrypterStub {
      async encrypt (payload: string): Promise<string> {
        return new Promise(resolve => resolve('hashed_payload'))
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DBAddAccount(encrypterStub)
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
