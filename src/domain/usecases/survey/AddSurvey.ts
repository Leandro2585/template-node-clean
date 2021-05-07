import { SurveyModel } from '../../models/Survey'

export type AddSurveyParams = Omit<SurveyModel, 'id'>

export interface AddSurvey {
  create(data: AddSurveyParams): Promise<void>;
}
