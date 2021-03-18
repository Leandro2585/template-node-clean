import { badRequest, serverError } from '../helpers/HttpHelper'
import { MissingParamError, InvalidParamError } from '../errors'
import { EmailValidator, Controller, HttpResponse, HttpRequest } from '../protocols'
import { AddAccount } from '../../domain/usecases/AddAccount'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmPassword']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, confirmPassword } = httpRequest.body
      if (password !== confirmPassword) {
        return badRequest(new InvalidParamError('confirmPassword'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      this.addAccount.create({
        name,
        email,
        password
      })
    } catch (error) {
      return serverError()
    }
  }
}
