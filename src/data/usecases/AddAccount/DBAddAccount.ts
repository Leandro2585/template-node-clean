import { Hasher, AddAccount, AccountModel, AddAccountModel, AddAccountRepository, LoadAccountByEmailRepository } from './DBAddAccountProtocols'

export class DBAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async create (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = await this.addAccountRepository.create(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
