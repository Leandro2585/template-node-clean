import { Controller } from '@shared/protocols'
import { LoginController } from '@shared/controllers/Login/LoginController'
import { makeLoginValidation } from './LoginValidationFactory'
import { makeDBAuthentication } from '@main/factories/usecases/Authentication/DBAuthenticationFactory'
import { makeLogControllerDecorator } from '@main/factories/decorators/LogControllerDecoratorFactory'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDBAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
