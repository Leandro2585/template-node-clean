import {
  errorSchema,
  surveySchema,
  accountSchema,
  surveysSchema,
  loginParamsSchema,
  surveyAnswerSchema,
  surveyResultSchema,
  signUpParamsSchema,
  addSurveyParamsSchema,
  saveSurveyParamsSchema,
  surveyResultAnswerSchema
} from './schemas'

export default {
  account: accountSchema,
  error: errorSchema,
  survey: surveySchema,
  surveys: surveysSchema,
  loginParams: loginParamsSchema,
  surveyResult: surveyResultSchema,
  signUpParams: signUpParamsSchema,
  surveyAnswer: surveyAnswerSchema,
  addSurveyParams: addSurveyParamsSchema,
  saveSurveyParams: saveSurveyParamsSchema,
  surveyResultAnswer: surveyResultAnswerSchema
}
