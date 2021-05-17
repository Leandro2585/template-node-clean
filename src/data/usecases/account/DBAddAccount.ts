import { Hasher, AddAccountRepository, LoadAccountByEmailRepository } from '@data/protocols'
import { AddAccount } from '@domain/usecases/account'

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
      return newAccount
    }
    return null
  }
}
