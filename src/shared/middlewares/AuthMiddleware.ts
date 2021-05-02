import { AccessDeniedError } from '@shared/errors'
import { forbidden } from '@shared/helpers/http/HttpHelper'
import { HttpRequest, HttpResponse, Middleware } from '@shared/protocols'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = forbidden(new AccessDeniedError())
    return new Promise(resolve => resolve(error))
  }
}
