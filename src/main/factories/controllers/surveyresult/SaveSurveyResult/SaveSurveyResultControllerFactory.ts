import { makeLogControllerDecorator } from '@main/factories/decorators/LogControllerDecoratorFactory'
import { makeDBLoadSurveyById } from '@main/factories/usecases/survey/LoadSurveyById/DBLoadSurveyByIdFactory'
import { makeDBSaveSurveyResult } from '@main/factories/usecases/surveyresult/SaveSurveyResult/DBSaveSurveyResultFactory'
import { SaveSurveyResultController } from '@shared/controllers/surveyresult/SaveSurveyResult/SaveSurveyResultController'
import { Controller } from '@shared/protocols'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDBLoadSurveyById(), makeDBSaveSurveyResult())
  return makeLogControllerDecorator(controller)
}
