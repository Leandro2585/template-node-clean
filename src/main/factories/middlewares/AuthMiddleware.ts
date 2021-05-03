import { AuthMiddleware } from '@shared/middlewares/AuthMiddleware'
import { Middleware } from '@shared/protocols'
import { makeDBLoadAccountByToken } from '../usecases/LoadAccountByToken/DBLoadAccountByTokenFactory'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDBLoadAccountByToken(), role)
}
