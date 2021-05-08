import MockDate from 'mockdate'
import { AddSurveyRepository } from './DBAddSurveyProtocols'
import { DBAddSurvey } from './DBAddSurvey'
import { mockAddSurveyParams, throwError } from '@domain/test'
import { mockAddSurveyRepository } from '@data/test'

type SutTypes = {
  sut: DBAddSurvey;
  addSurveyRepositoryStub: AddSurveyRepository;
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = mockAddSurveyRepository()
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
