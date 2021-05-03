import { Router } from 'express'
import { makeAuthMiddleware } from '../factories/middlewares/AuthMiddleware'
import { adaptRoute } from '../adapters/ExpressRouteAdapter'
import { adaptMiddleware } from '../adapters/ExpressMiddlewareAdapter'
import { makeAddSurveyController } from '../factories/controllers/AddSurvey/AddSurveyControllerFactory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
}
