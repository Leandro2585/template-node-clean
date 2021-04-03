import { Authentication } from '@domain/usecases/Authentication'
import { InvalidParamError, MissingParamError } from '@presentation/errors'
import { badRequest, serverError } from '@presentation/helpers/HttpHelper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../SignUp/SignUpProtocols'

export class LoginController implements Controller {
  private readonly emailValidator
  private readonly authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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

      await this.authentication.auth(email, password)
    } catch (error) {
      return serverError(error)
    }
  }
}
