import { Router } from 'express'
import { adaptRoute } from '../adapters/express/ExpressRouteAdapter'
import { makeAddSurveyController } from '../factories/controllers/AddSurvey/AddSurveyControllerFactory'

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeAddSurveyController()))
}
