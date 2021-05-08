import { SaveSurveyResultRepository } from '@data/protocols/database/surveyresult/SaveSurveyResultRepository'
import { SurveyResultModel } from '@domain/models/SurveyResult'
import { mockSurveyResultModel } from '@domain/test'
import { SaveSurveyResultParams } from '@domain/usecases/surveyresult'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(mockSurveyResultModel()))
    }
  }
  return new SaveSurveyResultRepositoryStub()
}
