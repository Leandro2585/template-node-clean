import { Hasher, AddAccount, AddAccountRepository, LoadAccountByEmailRepository } from './DBAddAccountProtocols'

export class DBAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async create (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      const newAccount = await this.addAccountRepository.create(Object.assign({}, accountData, { password: hashedPassword }))
      return newAccount && true
    }
    return null
  }
}
