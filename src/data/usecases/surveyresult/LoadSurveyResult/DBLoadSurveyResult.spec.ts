import { LoadSurveyResultRepository } from '@data/protocols/database/surveyresult/LoadSurveyResultRepository'
import { mockSurveyResultModel } from '@domain/test'
import { SurveyResultModel } from '../SaveSurveyResult/DBSaveSurveyResultProtocols'
import { DBLoadSurveyResult } from './DBLoadSurveyResult'

describe('DBLoadSurveyResult Usecase', () => {
  test('should call LoadSurveyResultRepository', async () => {
    class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
      async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
        return Promise.resolve(mockSurveyResultModel())
      }
    }
    const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub()
    const sut = new DBLoadSurveyResult(loadSurveyResultRepositoryStub)
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_survey_id')
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
