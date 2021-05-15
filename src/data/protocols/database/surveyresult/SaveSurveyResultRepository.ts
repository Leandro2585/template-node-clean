import { SaveSurveyResult } from '@domain/usecases/surveyresult/SaveSurveyResult'

export interface SaveSurveyResultRepository {
  save(data: SaveSurveyResultRepository.Params): Promise<void>;
}

export namespace SaveSurveyResultRepository {
  export type Params = SaveSurveyResult.Params
}