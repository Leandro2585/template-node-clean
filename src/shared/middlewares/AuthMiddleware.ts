import { LoadAccountByToken } from '@domain/usecases/LoadAccountByToken'
import { AccessDeniedError } from '@shared/errors'
import { forbidden } from '@shared/helpers/http/HttpHelper'
import { HttpRequest, HttpResponse, Middleware } from '@shared/protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      await this.loadAccountByToken.load(accessToken)
    }
    return forbidden(new AccessDeniedError())
  }
}
