import env from '@main/config/env'
import { DBAuthentication } from '@data/usecases/account/Authentication/DBAuthentication'
import { AccountMongoRepository } from '@infra/database/mongodb/account/AccountMongoRepository'
import { BCryptAdapter } from '@infra/criptography/BCryptAdapter/BCryptAdapter'
import { JWTAdapter } from '@infra/criptography/JWTAdapter/JWTAdapter'
import { Authentication } from '@domain/usecases/Authentication'

export const makeDBAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BCryptAdapter(salt)
  const jwtAdapter = new JWTAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DBAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
