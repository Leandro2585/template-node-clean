import { SurveyResultModel } from '@domain/models/SurveyResult'
import { SaveSurveyResultParams } from '@domain/usecases/SaveSurveyResult'

export interface SaveSurveyResultRepository {
  save(data: SaveSurveyResultParams): Promise<SurveyResultModel>;
}
