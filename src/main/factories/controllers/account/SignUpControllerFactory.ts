import { Controller } from '@shared/protocols'
import { SignUpController } from '@shared/controllers/account'
import { makeSignUpValidation } from '@main/factories/validators'
import { makeLogControllerDecorator } from '@main/factories/decorators'
import { makeDBAuthentication, makeDBAddAccount } from '@main/factories/usecases/account'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDBAddAccount(), makeSignUpValidation(), makeDBAuthentication())
  return makeLogControllerDecorator(controller)
}
