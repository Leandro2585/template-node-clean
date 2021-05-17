import env from '@main/config/env'
import { Authentication } from '@domain/usecases/account'
import { DBAuthentication } from '@data/usecases/account'
import { BCryptAdapter, JWTAdapter } from '@infra/criptography'
import { AccountMongoRepository } from '@infra/mongodb'

export const makeDBAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BCryptAdapter(salt)
  const jwtAdapter = new JWTAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DBAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
