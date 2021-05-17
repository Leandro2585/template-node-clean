import { AddAccount, Authentication } from '../usecases/account'
import { AccountModel } from '../models/Account'
import faker from 'faker'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => {
  return Object.assign({}, mockAddAccountParams(), { id: 'any_id', password: 'hashed_password' })
}

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
