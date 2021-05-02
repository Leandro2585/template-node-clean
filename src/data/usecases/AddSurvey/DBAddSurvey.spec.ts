import { AddSurveyModel, AddSurveyRepository } from './DBAddSurveyProtocols'
import { DBAddSurvey } from './DBAddSurvey'

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

describe('DBAddSurvey Usecase', () => {
  test('should call AddSurveyRepository with correct values', async () => {
    class AddSurveyRepositoryStub implements AddSurveyRepository {
      create (surveyData: AddSurveyModel): Promise<void> {
        return new Promise(resolve => resolve())
      }
    }
    const addSurveyRepositoryStub = new AddSurveyRepositoryStub()
    const createSpy = jest.spyOn(addSurveyRepositoryStub, 'create')
    const sut = new DBAddSurvey(addSurveyRepositoryStub)
    const surveyData = makeFakeSurveyData()
    await sut.create(surveyData)
    expect(createSpy).toHaveBeenCalledWith(surveyData)
  })
})
