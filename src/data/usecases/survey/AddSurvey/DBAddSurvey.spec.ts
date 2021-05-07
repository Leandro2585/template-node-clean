import MockDate from 'mockdate'
import { AddSurveyParams, AddSurveyRepository } from './DBAddSurveyProtocols'
import { DBAddSurvey } from './DBAddSurvey'

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

const makeFakeSurveyData = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})

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
    const surveyData = makeFakeSurveyData()
    await sut.create(surveyData)
    expect(createSpy).toHaveBeenCalledWith(surveyData)
  })

  test('should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.create(makeFakeSurveyData())
    await expect(promise).rejects.toThrow()
  })
})
