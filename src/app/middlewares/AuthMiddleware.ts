import { HttpResponse, Middleware } from '@app/protocols'
import { forbidden, ok } from '@app/helpers/http'
import { LoadAccountByToken } from '@domain/usecases/account'
import { AccessDeniedError } from '@app/errors'

export class AuthMiddleware extends Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) { super() }

  async execute (request: AuthMiddleware.Request): Promise<HttpResponse> {
    const { accessToken } = request
    if (accessToken) {
      const account = await this.loadAccountByToken.load(accessToken, this.role)
      if (account) return ok({ accountId: account.id })
    }
    return forbidden(new AccessDeniedError())
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string;
  }
}
