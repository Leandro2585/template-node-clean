import env from '@main/config/env'
import { JWTAdapter } from '@infra/criptography'
import { LoadAccountByToken } from '@domain/usecases/account'
import { DBLoadAccountByToken } from '@data/usecases/account'
import { AccountMongoRepository } from '@infra/mongodb'

export const makeDBLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JWTAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DBLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
