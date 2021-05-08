import { AddSurveyRepository } from '@data/protocols/database/survey/AddSurveyRepository'
import { LoadSurveyByIdRepository } from '@data/protocols/database/survey/LoadSurveyByIdRepository'
import { LoadSurveysRepository } from '@data/protocols/database/survey/LoadSurveysRepository'
import { SurveyModel } from '@domain/models/Survey'
import { mockSurveyModel, mockSurveysModelArray } from '@domain/test'
import { AddSurveyParams } from '@domain/usecases/survey'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async create (data: AddSurveyParams): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = () => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(mockSurveyModel()))
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveysRepository = () => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    loadAll (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(mockSurveysModelArray()))
    }
  }
  return new LoadSurveysRepositoryStub()
}
