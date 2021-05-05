import { adaptMiddleware } from '../adapters/ExpressMiddlewareAdapter'
import { makeAuthMiddleware } from '../factories/middlewares/AuthMiddleware'

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
