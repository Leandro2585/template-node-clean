import { mockAccountModel } from '@tests/domain/fakes'
import { AddAccount, Authentication, LoadAccountByToken } from '@domain/usecases/account'
import faker from 'faker'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  isValid = true

  async create (params: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = params
    return this.isValid
  }
}

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  result = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName()
  }

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return this.result
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accessToken: string;
  role: string;
  result = mockAccountModel()
  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    this.accessToken = accessToken
    this.role = role
    return this.result
  }
}

