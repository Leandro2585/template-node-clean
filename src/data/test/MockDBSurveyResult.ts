import { LoadSurveyResultRepository } from '@data/protocols/database/surveyresult/LoadSurveyResultRepository'
import { SaveSurveyResultRepository } from '@data/protocols/database/surveyresult/SaveSurveyResultRepository'
import { SurveyResultModel } from '@domain/models/SurveyResult'
import { mockSurveyResultModel } from '@domain/test'
import { SaveSurveyResultParams } from '@domain/usecases/surveyresult'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<void> {
      return Promise.resolve()
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyResultRepositoryStub()
}
