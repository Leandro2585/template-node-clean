import { SurveyModel, LoadSurveysRepository } from './DBLoadSurveysProtocols'
import { DBLoadSurveys } from './DBLoadSurveys'
import MockDate from 'mockdate'
import { mockSurveysModelArray, throwError } from '@domain/test'

type SutTypes = {
  sut: DBLoadSurveys;
  loadSurveysRepositoryStub: LoadSurveysRepository;
}

const makeLoadSurveysRepository = () => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    loadAll (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(mockSurveysModelArray()))
    }
  }
  return new LoadSurveysRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveysRepository()
  const sut = new DBLoadSurveys(loadSurveysRepositoryStub)
  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DBLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should call LoadSurveyRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('should return a list of Surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(mockSurveysModelArray())
  })

  test('should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
