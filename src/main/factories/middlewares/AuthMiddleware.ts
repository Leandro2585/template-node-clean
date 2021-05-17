import { makeDBLoadAccountByToken } from '@main/factories/usecases/account'
import { AuthMiddleware } from '@shared/middlewares'
import { Middleware } from '@shared/protocols'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDBLoadAccountByToken(), role)
}
