import { makeDBLoadAccountByToken } from '@main/factories/usecases/account'
import { AuthMiddleware } from '@app/middlewares'
import { Middleware } from '@app/protocols'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDBLoadAccountByToken(), role)
}
