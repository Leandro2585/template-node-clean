import { AddAccountRepository } from '@data/protocols/database/account/AddAccountRepository'
import { LoadAccountByTokenRepository } from '@data/protocols/database/account/LoadAccountByTokenRepository'
import { UpdateAccessTokenRepository } from '@data/protocols/database/account/UpdateAccessTokenRepository'
import { LoadAccountByEmailRepository } from '@data/usecases/account/AddAccount/DBAddAccountProtocols'
import { mockAccountModel } from '@domain/test'
import faker from 'faker'

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params
  result = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
  async create (params: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.params = params
    return this.result
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string;
  result = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  accessToken: string;
  role: string;
  result = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  async loadByToken (accessToken: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
    this.accessToken = accessToken
    this.role = role
    return this.result
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: string;
  token: string;

  async updateAccessToken (id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
  }
}

