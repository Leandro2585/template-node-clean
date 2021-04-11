import { LoadAccountByEmailRepository } from '@data/protocols/database/LoadAccountByEmailRepository'
import { Authentication, AuthenticationModel } from '@domain/usecases/Authentication'

export class DBAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository

  constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(authentication.email)
    return null
  }
}
