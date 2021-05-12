import { SurveyModel } from '@domain/models/Survey'

export interface LoadSurveyById {
  loadById(surveyId: string): Promise<SurveyModel>
}
