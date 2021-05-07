import { AddSurveyParams } from '@domain/usecases/AddSurvey'

export interface AddSurveyRepository {
  create(surveyData: AddSurveyParams): Promise<void>
}
