import { Controller } from '@app/protocols'
import { LoginController } from '@app/controllers/account'
import { makeDBAuthentication } from '@main/factories/usecases/account'
import { makeLogControllerDecorator } from '@main/factories/decorators'
import { makeLoginValidation } from '@main/factories/validators'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDBAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
