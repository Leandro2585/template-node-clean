import MockDate from 'mockdate'
import { AddSurveyParams, AddSurveyRepository } from './DBAddSurveyProtocols'
import { DBAddSurvey } from './DBAddSurvey'
import { mockAddSurveyParams, throwError } from '@domain/test'

type SutTypes = {
  sut: DBAddSurvey;
  addSurveyRepositoryStub: AddSurveyRepository;
}

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    create (surveyData: AddSurveyParams): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddSurveyRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepository()
  const sut = new DBAddSurvey(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}

describe('DBAddSurvey Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(addSurveyRepositoryStub, 'create')
    const surveyData = mockAddSurveyParams()
    await sut.create(surveyData)
    expect(createSpy).toHaveBeenCalledWith(surveyData)
  })

  test('should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'create').mockImplementationOnce(throwError)
    const promise = sut.create(mockAddSurveyParams())
    await expect(promise).rejects.toThrow()
  })
})
