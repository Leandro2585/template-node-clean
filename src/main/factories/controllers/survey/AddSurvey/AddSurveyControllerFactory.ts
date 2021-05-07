import { makeLogControllerDecorator } from '../../decorators/LogControllerDecoratorFactory'
import { makeAddSurveysValidation } from './AddSurveyValidationFactory'
import { makeDBAddSurvey } from '../../usecases/AddSurvey/DBAddSurveyFactory'
import { AddSurveyController } from '@shared/controllers/survey/AddSurvey/AddSurveyController'
import { Controller } from '@shared/protocols'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveysValidation(), makeDBAddSurvey())
  return makeLogControllerDecorator(controller)
}
