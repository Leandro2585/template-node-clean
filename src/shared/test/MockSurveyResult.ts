import { SaveSurveyResult, SaveSurveyResultParams } from '@domain/usecases/surveyresult'
import { SurveyResultModel } from '@domain/models/SurveyResult'
import { mockSurveyResultModel } from '@domain/test'

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(mockSurveyResultModel()))
    }
  }
  return new SaveSurveyResultStub()
}
