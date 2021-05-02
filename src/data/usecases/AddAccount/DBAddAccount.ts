import { Hasher, AddAccount, AccountModel, AddAccountModel, AddAccountRepository, LoadAccountByEmailRepository } from './DBAddAccountProtocols'

export class DBAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async create (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      const newAccount = await this.addAccountRepository.create(Object.assign({}, accountData, { password: hashedPassword }))
      return newAccount
    }
    return null
  }
}
