import { SurveyResultModel } from '@domain/models/SurveyResult'
import { SaveSurveyResultParams } from '@domain/usecases/surveyresult/SaveSurveyResult'

export interface SaveSurveyResultRepository {
  save(data: SaveSurveyResultParams): Promise<SurveyResultModel>;
}
