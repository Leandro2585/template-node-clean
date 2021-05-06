import { SurveyAnswerModel } from '../models/Survey'

export type AddSurveyModel = {
  question: string;
  answers: SurveyAnswerModel[];
  date: Date;
}

export interface AddSurvey {
  create(data: AddSurveyModel): Promise<void>;
}
