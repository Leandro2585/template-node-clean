import { DBLoadAccountByToken } from '@data/usecases/LoadAccountByToken/DBLoadAccountByToken'
import { LoadAccountByToken } from '@domain/usecases/LoadAccountByToken'
import { JWTAdapter } from '@infra/criptography/JWTAdapter/JWTAdapter'
import { AccountMongoRepository } from '@infra/database/mongodb/account/AccountMongoRepository'
import env from '../../../config/env'

export const makeDBLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JWTAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DBLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
