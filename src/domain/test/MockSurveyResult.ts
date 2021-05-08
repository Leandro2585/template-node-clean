import { SurveyResultModel } from '@domain/models/SurveyResult'
import { SaveSurveyResultParams } from '@domain/usecases/surveyresult'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSurveyResultModel = (): SurveyResultModel => {
  return Object.assign({}, mockSaveSurveyResultParams(), { id: 'any_id' })
}
