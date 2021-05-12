import { SaveSurveyResult, SaveSurveyResultParams } from '@domain/usecases/surveyresult'
import { SurveyResultModel } from '@domain/models/SurveyResult'
import { mockSurveyResultModel } from '@domain/test'
import { LoadSurveyResult } from '@domain/usecases/surveyresult/LoadSurveyResult'

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(mockSurveyResultModel()))
    }
  }
  return new SaveSurveyResultStub()
}

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load (surveyId: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyResultStub()
}
