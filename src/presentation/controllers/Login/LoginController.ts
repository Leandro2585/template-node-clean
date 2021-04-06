import { ok, badRequest, serverError, unauthorized } from '../../helpers/HttpHelper'
import { Validation } from '../SignUp/SignUpProtocols'
import { Authentication, Controller, HttpRequest, HttpResponse } from './LoginProtocols'

export class LoginController implements Controller {
  private readonly validation: Validation;
  private readonly authentication: Authentication

  constructor (authentication: Authentication, validation: Validation) {
    this.authentication = authentication
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest.body

      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) {
        return unauthorized()
      }

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
