import { AddSurveyParams } from '@domain/usecases/survey/AddSurvey'

export interface AddSurveyRepository {
  create(data: AddSurveyParams): Promise<void>
}
