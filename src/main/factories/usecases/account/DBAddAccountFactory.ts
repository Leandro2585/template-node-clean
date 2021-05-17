import { AccountMongoRepository } from '@infra/mongodb'
import { AddAccount } from '@domain/usecases/account'
import { DBAddAccount } from '@data/usecases/account'
import { BCryptAdapter } from '@infra/criptography'

export const makeDBAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BCryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DBAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
