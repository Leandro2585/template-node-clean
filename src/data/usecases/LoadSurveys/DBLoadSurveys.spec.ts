import { LoadSurveysRepository } from '../../protocols/database/survey/LoadSurveysRepository'
import { SurveyModel } from '@domain/models/Survey'
import { DBLoadSurveys } from './DBLoadSurveys'

const makeFakeSurveys = (): SurveyModel[] => ([
  {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }, {
    id: 'other_id',
    question: 'other_question',
    answers: [{
      image: 'other_image',
      answer: 'other_answer'
    }],
    date: new Date()
  }
])

describe('DBLoadSurveys', () => {
  test('should call LoadSurveyRepository', async () => {
    class LoadSurveysRepositoryStub implements LoadSurveysRepository {
      loadAll (): Promise<SurveyModel[]> {
        return new Promise(resolve => resolve(makeFakeSurveys()))
      }
    }
    const loadSurveysRepository = new LoadSurveysRepositoryStub()
    const loadAllSpy = jest.spyOn(loadSurveysRepository, 'loadAll')
    const sut = new DBLoadSurveys(loadSurveysRepository)
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
