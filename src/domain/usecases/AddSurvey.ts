import { SurveyModel } from '../models/Survey'

export type AddSurveyModel = Omit<SurveyModel, 'id'>

export interface AddSurvey {
  create(data: AddSurveyModel): Promise<void>;
}
