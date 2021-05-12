import { SurveyModel } from '@domain/models/Survey'

export interface LoadSurveyByIdRepository {
  loadById(surveyId: string): Promise<SurveyModel>
}
