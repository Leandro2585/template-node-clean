import { AddSurveyModel } from '@domain/usecases/AddSurvey'

export interface AddSurveyRepository {
  create(surveyData: AddSurveyModel): Promise<void>
}
