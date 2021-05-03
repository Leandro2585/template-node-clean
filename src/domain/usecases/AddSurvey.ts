import { SurveyAnswerModel } from '../models/Survey'

export interface AddSurveyModel {
  question: string;
  answers: SurveyAnswerModel[];
  date: Date;
}

export interface AddSurvey {
  create(data: AddSurveyModel): Promise<void>;
}
