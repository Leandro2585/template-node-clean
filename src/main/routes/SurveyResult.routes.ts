import { Router } from 'express'
import { auth } from '../middlewares/Auth'
import { adaptRoute } from '../adapters/ExpressRouteAdapter'
import { makeSaveSurveyResultController } from '../factories/controllers/surveyresult/SaveSurveyResult/SaveSurveyResultControllerFactory'
import { makeLoadSurveyResultController } from '../factories/controllers/surveyresult/LoadSurveyResult/LoadSurveyResultControllerFactory'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', auth, adaptRoute(makeLoadSurveyResultController()))
}
