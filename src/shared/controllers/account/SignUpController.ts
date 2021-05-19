import { Controller, HttpResponse, Validation } from '@shared/protocols'
import { badRequest, serverError, ok, forbidden } from '@shared/helpers/http'
import { AddAccount, Authentication } from '@domain/usecases/account'
import { EmailInUseError } from '@shared/errors'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        console.log(error)
        return badRequest(error)
      }
      const { name, email, password } = request
      const isValid = await this.addAccount.create({
        name,
        email,
        password
      })
      if (!isValid) {
        return forbidden(new EmailInUseError())
      }
      const authData = await this.authentication.auth({
        email,
        password
      })
      return ok(authData)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SignUpController {
  export type Request = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
}