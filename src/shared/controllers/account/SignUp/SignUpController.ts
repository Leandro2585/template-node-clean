import { EmailInUseError } from '@shared/errors'
import { badRequest, serverError, ok, forbidden } from '../../../helpers/http/HttpHelper'
import { AddAccount, Controller, HttpResponse, HttpRequest, Validation, Authentication } from './SignUpControllerProtocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
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

      if (!account) {
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
