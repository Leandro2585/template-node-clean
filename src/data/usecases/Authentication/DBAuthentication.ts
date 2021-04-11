import { HashComparer } from '../../protocols/criptography/HashComparer'
import { LoadAccountByEmailRepository } from '../../protocols/database/LoadAccountByEmailRepository'
import { Authentication, AuthenticationModel } from '@domain/usecases/Authentication'

export class DBAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer;
  constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository, hashComparer: HashComparer) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      await this.hashComparer.compare(authentication.password, account.password)
    }
    return null
  }
}
