import { SurveyModel } from '../../models/Survey'

export interface AddSurvey {
  create(params: AddSurvey.Params): Promise<void>;
}

export namespace AddSurvey {
  export type Params = Omit<SurveyModel, 'id'>
}
