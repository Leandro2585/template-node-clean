import { makeDBLoadSurveys } from '@main/factories/usecases/LoadSurveys/DBLoadSurveys'
import { LoadSurveysController } from '@shared/controllers/Survey/LoadSurveys/LoadSurveysController'
import { Controller } from '@shared/protocols'
import { makeLogControllerDecorator } from '../../decorators/LogControllerDecoratorFactory'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDBLoadSurveys())
  return makeLogControllerDecorator(controller)
}
