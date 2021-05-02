import { AddSurveyModel, AddSurveyRepository } from './DBAddSurveyProtocols'
import { DBAddSurvey } from './DBAddSurvey'

interface SutTypes {
  sut: DBAddSurvey;
  addSurveyRepositoryStub: AddSurveyRepository;
}

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    create (surveyData: AddSurveyModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddSurveyRepositoryStub()
}

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
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
