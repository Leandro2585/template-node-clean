import { SignUpController } from '@presentation/controllers/SignUp/SignUpController'
import { DBAddAccount } from '@data/usecases/AddAccount/DBAddAccount'
import { EmailValidatorAdapter } from '@utils/EmailValidatorAdapter'
import { BCryptAdapter } from '@infra/criptography/BCryptAdapter'
import { AccountMongoRepository } from '@infra/database/mongodb/accountRepository/Account'
import { Controller } from '@presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'
import { LogMongoRepository } from '@infra/database/mongodb/logRepository/log'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BCryptAdapter(salt)

  const emailValidator = new EmailValidatorAdapter()

  const addAccountRepository = new AccountMongoRepository()

  const dbAddAccount = new DBAddAccount(bcryptAdapter, addAccountRepository)

  const logMongoRepository = new LogMongoRepository()

  const signUpController = new SignUpController(emailValidator, dbAddAccount)

  return new LogControllerDecorator(signUpController, logMongoRepository)
}
