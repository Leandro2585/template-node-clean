import { LoadSurveysRepository } from '../../protocols/database/survey/LoadSurveysRepository'
import { SurveyModel } from '@domain/models/Survey'
import { DBLoadSurveys } from './DBLoadSurveys'

interface SutTypes {
  sut: DBLoadSurveys;
  loadSurveysRepositoryStub: LoadSurveysRepository;
}

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

const makeLoadSurveysRepository = () => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    loadAll (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(makeFakeSurveys()))
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
  test('should call LoadSurveyRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
