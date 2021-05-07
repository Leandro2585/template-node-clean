import { Router } from 'express'
import { adaptRoute } from '../adapters/ExpressRouteAdapter'
import { makeAddSurveyController } from '../factories/controllers/AddSurvey/AddSurveyControllerFactory'
import { makeLoadSurveysController } from '@main/factories/controllers/survey/LoadSurveys/LoadSurveysControllerFactory'
import { adminAuth } from '../middlewares/AdminAuth'
import { auth } from '../middlewares/Auth'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
