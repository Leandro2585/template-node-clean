import { HashComparer } from '../../protocols/criptography/HashComparer'
import { LoadAccountByEmailRepository } from '../../protocols/database/LoadAccountByEmailRepository'
import { Authentication, AuthenticationModel } from '@domain/usecases/Authentication'
import { TokenGenerator } from '@data/protocols/criptography/TokenGenerator'

export class DBAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer;
  private readonly tokenGenerator: TokenGenerator;
  constructor (
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      await this.hashComparer.compare(authentication.password, account.password)
      await this.tokenGenerator.generate(account.id)
    }
    return null
  }
}
