import { SaveSurveyResultRepository, SurveyResultModel, SaveSurveyResultParams } from './DBSaveSurveyResultProtocols'
import { DBSaveSurveyResult } from './DBSaveSurveyResult'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DBSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository;
}

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    save (data: Pick<SurveyResultModel, 'surveyId' | 'accountId' | 'answer' | 'date'>): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(makeFakeSurveyResult()))
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

const makeFakeSurveyResultData = (): SaveSurveyResultParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

const makeFakeSurveyResult = (): SurveyResultModel => Object.assign({}, makeFakeSurveyResultData(), { id: 'any_id' })

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
    const surveyResultData = makeFakeSurveyResultData()
    await sut.save(surveyResultData)
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
  })

  test('should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.save(makeFakeSurveyResultData())
    expect(promise).rejects.toThrow()
  })

  test('should return SurveyResult on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.save(makeFakeSurveyResultData())
    expect(surveyResult).toEqual(makeFakeSurveyResult())
  })
})
