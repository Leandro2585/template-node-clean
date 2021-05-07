import { makeDBLoadSurveys } from '@main/factories/usecases/survey/LoadSurveys/DBLoadSurveysFactory'
import { LoadSurveysController } from '@shared/controllers/survey/LoadSurveys/LoadSurveysController'
import { Controller } from '@shared/protocols'
import { makeLogControllerDecorator } from '../../../decorators/LogControllerDecoratorFactory'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDBLoadSurveys())
  return makeLogControllerDecorator(controller)
}
