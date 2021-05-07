import { Router } from 'express'
import { auth } from '../middlewares/Auth'
import { adaptRoute } from '../adapters/ExpressRouteAdapter'
import { makeSaveSurveyResultController } from '../factories/controllers/surveyresult/SaveSurveyResult/SaveSurveyResultControllerFactory'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
}
