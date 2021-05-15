import { SurveyModel } from '@domain/models/Survey'
import { mockSurveyModel, mockSurveysModelArray } from '@domain/test'
import { AddSurvey, LoadSurveyById, LoadSurveys } from '@domain/usecases/survey'

export class AddSurveySpy implements AddSurvey {
  params: AddSurvey.Params;

  async create (params: AddSurvey.Params): Promise<void> {
    this.params = params
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  result = mockSurveysModelArray()
  async load (): Promise<SurveyModel[]> {
    return this.result
  }
}

export class LoadSurveyByIdSpy implements LoadSurveyById {
  surveyId: string;
  result = mockSurveyModel()
  async loadById (surveyId: string): Promise<LoadSurveyById.Result> {
    this.surveyId = surveyId
    return this.result
  }
}
