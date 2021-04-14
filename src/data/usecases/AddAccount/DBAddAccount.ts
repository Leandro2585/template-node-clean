import { AddAccountRepository } from '../../protocols/database/account/AddAccountRepository'
import { Hasher, AddAccount, AccountModel, AddAccountModel } from './DBAddAccountProtocols'

export class DBAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async create (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    return await this.addAccountRepository.create(Object.assign({}, accountData, { password: hashedPassword }))
  }
}
