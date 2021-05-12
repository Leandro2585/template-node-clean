import { makeLogControllerDecorator } from '@main/factories/decorators/LogControllerDecoratorFactory'
import { makeDBLoadSurveyById } from '@main/factories/usecases/survey/LoadSurveyById/DBLoadSurveyByIdFactory'
import { makeDBLoadSurveyResult } from '@main/factories/usecases/surveyresult/LoadSurveyResult/DBLoadSurveyResultFactory'
import { LoadSurveyResultController } from '@shared/controllers/surveyresult/LoadSurveyResult/LoadSurveyResultController'
import { Controller } from '@shared/protocols'

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(makeDBLoadSurveyById(), makeDBLoadSurveyResult())
  return makeLogControllerDecorator(controller)
}
