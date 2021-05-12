import { SurveyModel } from '@domain/models/Survey'
import { SurveyResultModel } from '../../models/SurveyResult'

export interface LoadSurveyResult {
  load (surveyId: string): Promise<SurveyResultModel | SurveyModel>
}
