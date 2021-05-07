import { AddSurveyParams } from '@domain/usecases/survey/AddSurvey'

export interface AddSurveyRepository {
  create(surveyData: AddSurveyParams): Promise<void>
}
