import { AddAccountRepository } from '../../protocols/database/AddAccountRepository'
import { Hasher, AddAccount, AccountModel, AddAccountModel } from './DBAddAccountProtocols'

export class DBAddAccount implements AddAccount {
  private readonly hasher: Hasher
  private readonly addAccountRepository: AddAccountRepository
  constructor (hasher: Hasher, addAccountRepository: AddAccountRepository) {
    this.hasher = hasher
    this.addAccountRepository = addAccountRepository
  }

  async create (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    return await this.addAccountRepository.create(Object.assign({}, accountData, { password: hashedPassword }))
  }
}
