import { AddAccountRepository } from '../../protocols/AddAccountRepository'
import { Encrypter, AddAccount, AccountModel, AddAccountModel } from './DBAddAccountProtocols'

export class DBAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository
  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async create (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    await this.addAccountRepository.create(Object.assign({}, accountData, { password: hashedPassword }))
    return new Promise(resolve => resolve(null))
  }
}
