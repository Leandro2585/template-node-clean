import { SurveyModel } from '@domain/models/Survey'
import { mockSurveyModel, mockSurveysModelArray } from '@domain/test'
import { AddSurvey, AddSurveyParams, LoadSurveyById, LoadSurveys } from '@domain/usecases/survey'

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async create (data: AddSurveyParams): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddSurveyStub()
}

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(mockSurveysModelArray()))
    }
  }
  return new LoadSurveysStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(mockSurveyModel()))
    }
  }
  return new LoadSurveyByIdStub()
}
