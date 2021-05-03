import { Decrypter } from '@data/protocols/criptography/Decrypter'
import { LoadAccountByTokenRepository } from '@data/protocols/database/account/LoadAccountByTokenRepository'
import { LoadAccountByToken } from '@domain/usecases/LoadAccountByToken'
import { AccountModel } from '../AddAccount/DBAddAccountProtocols'

export class DBLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
