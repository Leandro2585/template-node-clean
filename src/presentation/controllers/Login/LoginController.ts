import { InvalidParamError, MissingParamError } from '@presentation/errors'
import { badRequest } from '@presentation/helpers/HttpHelper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../SignUp/SignUpProtocols'

export class LoginController implements Controller {
  private readonly emailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    if (!email) {
      return new Promise(resolve => badRequest(new MissingParamError('email')))
    }
    if (!password) {
      return new Promise(resolve => badRequest(new MissingParamError('password')))
    }
    const isValid = this.emailValidator.isValid(email)
    if (!isValid) {
      return new Promise(resolve => badRequest(new InvalidParamError('email')))
    }
  }
}
