import { Controller, HttpResponse, Validation } from '@app/protocols'
import { ok, badRequest, unauthorized } from '@app/helpers/http'
import { Authentication } from '@domain/usecases/account'

export class LoginController extends Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) { super() }

  async execute (request: LoginController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) return badRequest(error)
    const { email, password } = request
    const authenticationModel = await this.authentication.auth({ email, password })
    if (!authenticationModel) return unauthorized()
    return ok(authenticationModel)
  }
}

export namespace LoginController {
  export type Request = {
    email: string;
    password: string;
  }
}