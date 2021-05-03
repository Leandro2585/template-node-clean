import { Decrypter } from '@data/protocols/criptography/Decrypter'
import { LoadAccountByToken } from '@domain/usecases/LoadAccountByToken'
import { AccountModel } from '../AddAccount/DBAddAccountProtocols'

export class DBLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decrypter: Decrypter) {}
  async load (accessToken: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
