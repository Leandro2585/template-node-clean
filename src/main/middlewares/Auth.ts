import { adaptMiddleware } from '../adapters/ExpressMiddlewareAdapter'
import { makeAuthMiddleware } from '../factories/middlewares/AuthMiddleware'

export const auth = adaptMiddleware(makeAuthMiddleware())
