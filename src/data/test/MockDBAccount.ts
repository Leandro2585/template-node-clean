import { AddAccountRepository } from '@data/protocols/database/account/AddAccountRepository'
import { LoadAccountByTokenRepository } from '@data/protocols/database/account/LoadAccountByTokenRepository'
import { UpdateAccessTokenRepository } from '@data/protocols/database/account/UpdateAccessTokenRepository'
import { LoadAccountByEmailRepository } from '@data/usecases/account/AddAccount/DBAddAccountProtocols'
import { AccountModel } from '@domain/models/Account'
import { mockAccountModel } from '@domain/test'
import { AddAccountParams } from '@domain/usecases/account'

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async create (data: AddAccountParams): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockAccountModel()))
    }
  }
  return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockAccountModel()))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    loadByToken (accessToken: string, role?: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockAccountModel()))
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken (id: string, token: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}
