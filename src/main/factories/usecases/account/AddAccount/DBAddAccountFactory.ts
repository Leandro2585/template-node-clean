import { AccountMongoRepository } from '@infra/database/mongodb/account/AccountMongoRepository'
import { BCryptAdapter } from '@infra/criptography/BCryptAdapter/BCryptAdapter'
import { AddAccount } from '@domain/usecases/account/AddAccount'
import { DBAddAccount } from '@data/usecases/account/AddAccount/DBAddAccount'

export const makeDBAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BCryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DBAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
