import { Hasher, AddAccountRepository, LoadAccountByEmailRepository } from '@data/protocols'
import { AccountModel } from '@domain/models/Account'
import { AddAccount } from '@domain/usecases/account'

export class DBAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async create (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    let newAccount: AccountModel = null
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      newAccount = await this.addAccountRepository.create({...accountData, password: hashedPassword })
    }
    return newAccount !== null
  }
}
