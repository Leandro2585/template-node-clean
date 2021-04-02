import { MissingParamError } from '@presentation/errors'
import { badRequest } from '@presentation/helpers/HttpHelper'
import { Controller, HttpRequest, HttpResponse } from '../SignUp/SignUpProtocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return new Promise(resolve => badRequest(new MissingParamError('email')))
    }
    if (!httpRequest.body.password) {
      return new Promise(resolve => badRequest(new MissingParamError('password')))
    }
  }
}
