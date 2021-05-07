import { SaveSurveyResultRepository, SurveyResultModel } from './DBSaveSurveyResultProtocols'
import { DBSaveSurveyResult } from './DBSaveSurveyResult'
import MockDate from 'mockdate'
import { mockSurveyResultModel, mockAddSurveyResultParams } from '@domain/test/MockSurveyResult'

type SutTypes = {
  sut: DBSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository;
}

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SurveyResultModel): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(mockSurveyResultModel()))
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository()
  const sut = new DBSaveSurveyResult(saveSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

describe('DBSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    const surveyResultData = mockAddSurveyResultParams()
    await sut.save(surveyResultData)
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
  })

  test('should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.save(mockAddSurveyResultParams())
    expect(promise).rejects.toThrow()
  })

  test('should return SurveyResult on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.save(mockAddSurveyResultParams())
    expect(surveyResult).toEqual(mockSurveyResultModel())
  })
})
