import { SignUpController } from '@presentation/controllers/SignUp/SignUpController'
import { DBAddAccount } from '@data/usecases/AddAccount/DBAddAccount'
import { EmailValidatorAdapter } from '@utils/EmailValidatorAdapter'
import { BCryptAdapter } from '@infra/criptography/BCryptAdapter'
import { AccountMongoRepository } from '@infra/database/mongodb/accountRepository/Account'

export const makeSignUpController = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter()

  const salt = 12
  const bcryptAdapter = new BCryptAdapter(salt)

  const addAccountRepository = new AccountMongoRepository()

  const dbAddAccount = new DBAddAccount(bcryptAdapter, addAccountRepository)

  return new SignUpController(emailValidator, dbAddAccount)
}
