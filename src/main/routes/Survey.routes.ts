import { Router } from 'express'
import { makeAuthMiddleware } from '../factories/middlewares/AuthMiddleware'
import { adaptRoute } from '../adapters/ExpressRouteAdapter'
import { adaptMiddleware } from '../adapters/ExpressMiddlewareAdapter'
import { makeAddSurveyController } from '../factories/controllers/AddSurvey/AddSurveyControllerFactory'
import { makeLoadSurveysController } from '@main/factories/controllers/LoadSurveys/LoadSurveysControllerFactory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  const auth = adaptMiddleware(makeAuthMiddleware())
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
