import { Encrypter, AccountModel, AddAccountModel, AddAccountRepository } from './DBAddAccountProtocols'
import { DBAddAccount } from './DBAddAccount'

interface SutTypes {
  sut: DBAddAccount;
  encrypterStub: Encrypter;
  addAccountRepositoryStub: AddAccountRepository;
  fakeAccount: AccountModel;
  fakeAccountData: AddAccountModel;
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (payload: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }

  return new EncrypterStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async create (accountData: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new AddAccountRepositoryStub()
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password'
})

const makeFakeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password'
})

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const fakeAccount = makeFakeAccount()
  const fakeAccountData = makeFakeAccountData()
  const sut = new DBAddAccount(encrypterStub, addAccountRepositoryStub)

  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub,
    fakeAccount,
    fakeAccountData
  }
}

describe('DBAddAccount Usecase', () => {
  test('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub, fakeAccountData } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    await sut.create(fakeAccountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub, fakeAccountData } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.create(fakeAccountData)
    await expect(promise).rejects.toThrow()
  })

  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub, fakeAccountData } = makeSut()
    const createSpy = jest.spyOn(addAccountRepositoryStub, 'create')

    await sut.create(fakeAccountData)
    expect(createSpy).toHaveBeenCalledWith(fakeAccountData)
  })

  test('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub, fakeAccountData } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.create(fakeAccountData)
    await expect(promise).rejects.toThrow()
  })

  test('should return an account on success', async () => {
    const { sut, fakeAccount, fakeAccountData } = makeSut()

    const account = await sut.create(fakeAccountData)

    expect(account).toEqual(fakeAccount)
  })
})
