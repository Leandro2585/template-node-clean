import { Controller, HttpResponse, Validation } from '@app/protocols'
import { badRequest, ok, forbidden } from '@app/helpers/http'
import { AddAccount, Authentication } from '@domain/usecases/account'
import { EmailInUseError } from '@app/errors'

export class SignUpController extends Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) { super() }

  async execute (request: SignUpController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) return badRequest(error)
    const { name, email, password } = request
    const isValid = await this.addAccount.create({ name, email, password })
    if (!isValid) return forbidden(new EmailInUseError())
    const authenticationModel = await this.authentication.auth({ email, password })
    return ok(authenticationModel)
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