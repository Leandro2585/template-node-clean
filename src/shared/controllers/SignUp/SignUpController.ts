import { badRequest, serverError, ok } from '../../helpers/http/HttpHelper'
import { AddAccount, Controller, HttpResponse, HttpRequest, Validation } from './SignUpControllerProtocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        console.log(error)
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body

      const account = await this.addAccount.create({
        name,
        email,
        password
      })
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
