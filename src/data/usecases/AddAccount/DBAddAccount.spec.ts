import { Hasher, AccountModel, AddAccountModel, AddAccountRepository } from './DBAddAccountProtocols'
import { DBAddAccount } from './DBAddAccount'

interface SutTypes {
  sut: DBAddAccount;
  hasherStub: Hasher;
  addAccountRepositoryStub: AddAccountRepository;
  fakeAccount: AccountModel;
  fakeAccountData: AddAccountModel;
}

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (payload: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }

  return new HasherStub()
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
  const hasherStub = makeHasher()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const fakeAccount = makeFakeAccount()
  const fakeAccountData = makeFakeAccountData()
  const sut = new DBAddAccount(hasherStub, addAccountRepositoryStub)

  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    fakeAccount,
    fakeAccountData
  }
}

describe('DBAddAccount Usecase', () => {
  test('should call Hasher with correct password', async () => {
    const { sut, hasherStub, fakeAccountData } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')

    await sut.create(fakeAccountData)
    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })

  test('should throw if Hasher throws', async () => {
    const { sut, hasherStub, fakeAccountData } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.create(fakeAccountData)
    await expect(promise).rejects.toThrow()
  })

  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub, fakeAccountData } = makeSut()
    const createSpy = jest.spyOn(addAccountRepositoryStub, 'create')

    await sut.create(fakeAccountData)
    expect(createSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
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
