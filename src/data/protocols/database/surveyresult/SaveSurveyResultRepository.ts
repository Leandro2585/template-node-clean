import { SaveSurveyResultParams } from '@domain/usecases/surveyresult/SaveSurveyResult'

export interface SaveSurveyResultRepository {
  save(data: SaveSurveyResultParams): Promise<void>;
}
