import { AddAccount, AddAccountParams, Authentication, AuthenticationParams, LoadAccountByToken } from '@domain/usecases/account'
import { AccountModel } from '@domain/models/Account'
import { mockAccountModel } from '@domain/test'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async create (account: AddAccountParams): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockAccountModel()))
    }
  }
  return new AddAccountStub()
}

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationParams): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }
  return new AuthenticationStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    load (accessToken: string, role?: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockAccountModel()))
    }
  }
  return new LoadAccountByTokenStub()
}
