import { Controller } from '@shared/protocols'
import { LoginController } from '@shared/controllers/account'
import { makeDBAuthentication } from '@main/factories/usecases/account'
import { makeLogControllerDecorator } from '@main/factories/decorators'
import { makeLoginValidation } from '@main/factories/validators'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDBAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
