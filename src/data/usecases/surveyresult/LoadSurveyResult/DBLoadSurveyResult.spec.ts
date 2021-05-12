import { LoadSurveyResultRepository } from '@data/protocols/database/surveyresult/LoadSurveyResultRepository'
import { mockSurveyResultModel } from '@domain/test'
import { SurveyResultModel } from '../SaveSurveyResult/DBSaveSurveyResultProtocols'
import { DBLoadSurveyResult } from './DBLoadSurveyResult'

type SutTypes = {
  sut: DBLoadSurveyResult;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}

const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyResultRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const sut = new DBLoadSurveyResult(loadSurveyResultRepositoryStub)

  return {
    sut,
    loadSurveyResultRepositoryStub
  }
}

describe('DBLoadSurveyResult Usecase', () => {
  test('should call LoadSurveyResultRepository', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_survey_id')
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
