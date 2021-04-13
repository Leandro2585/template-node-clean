import { SignUpController } from '@shared/controllers/SignUp/SignUpController'
import { DBAddAccount } from '@data/usecases/AddAccount/DBAddAccount'
import { BCryptAdapter } from '@infra/criptography/BCryptAdapter/BCryptAdapter'
import { AccountMongoRepository } from '@infra/database/mongodb/accountRepository/Account'
import { Controller } from '@shared/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { LogMongoRepository } from '@infra/database/mongodb/logRepository/log'
import { makeSignUpValidation } from './SignUpValidation'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BCryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const dbAddAccount = new DBAddAccount(bcryptAdapter, addAccountRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
