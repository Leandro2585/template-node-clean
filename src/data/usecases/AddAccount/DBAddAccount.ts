import { AccountModel } from '../../../domain/models/Account'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/AddAccount'
import { Encrypter } from '../../protocols/encrypter'

export class DBAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async create (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return new Promise(resolve => resolve(null))
  }
}
