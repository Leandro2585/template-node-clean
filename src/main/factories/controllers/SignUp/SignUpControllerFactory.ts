import { SignUpController } from '@shared/controllers/SignUp/SignUpController'
import { Controller } from '@shared/protocols'
import { makeSignUpValidation } from './SignUpValidationFactory'
import { makeDBAuthentication } from '@main/factories/usecases/Authentication/DBAuthenticationFactory'
import { makeDBAddAccount } from '@main/factories/usecases/AddAccount/DBAddAccountFactory'
import { makeLogControllerDecorator } from '@main/factories/decorators/LogControllerDecoratorFactory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDBAddAccount(), makeSignUpValidation(), makeDBAuthentication())
  return makeLogControllerDecorator(controller)
}
