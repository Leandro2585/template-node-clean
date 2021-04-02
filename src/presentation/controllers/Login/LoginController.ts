import { MissingParamError } from '@presentation/errors'
import { badRequest } from '@presentation/helpers/HttpHelper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../SignUp/SignUpProtocols'

export class LoginController implements Controller {
  private readonly emailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return new Promise(resolve => badRequest(new MissingParamError('email')))
    }
    if (!httpRequest.body.password) {
      return new Promise(resolve => badRequest(new MissingParamError('password')))
    }
    this.emailValidator.isValid(httpRequest.body.email)
  }
}
