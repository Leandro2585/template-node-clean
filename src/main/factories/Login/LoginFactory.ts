import env from '@main/config/env'
import { Controller } from '@shared/protocols'
import { LoginController } from '@shared/controllers/Login/LoginController'
import { makeLoginValidation } from './LoginValidationFactory'
import { DBAuthentication } from '@data/usecases/Authentication/DBAuthentication'
import { LogMongoRepository } from '@infra/database/mongodb/log/LogMongoRepository'
import { LogControllerDecorator } from '@main/decorators/LogControllerDecorator'
import { AccountMongoRepository } from '@infra/database/mongodb/account/AccountMongoRepository'
import { BCryptAdapter } from '@infra/criptography/BCryptAdapter/BCryptAdapter'
import { JWTAdapter } from '@infra/criptography/JWTAdapter/JWTAdapter'
export const makeLoginController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BCryptAdapter(salt)
  const jwtAdapter = new JWTAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAuththentication = new DBAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const loginController = new LoginController(dbAuththentication, makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
