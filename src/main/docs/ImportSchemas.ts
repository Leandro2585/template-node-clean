import {
  errorSchema,
  surveyAnswer,
  surveySchema,
  accountSchema,
  surveysSchema,
  loginParamsSchema,
  surveyResultSchema,
  signUpParamsSchema,
  addSurveyParamsSchema,
  saveSurveyParamsSchema
} from './schemas'

export default {
  account: accountSchema,
  error: errorSchema,
  survey: surveySchema,
  surveys: surveysSchema,
  surveyAnswer: surveyAnswer,
  loginParams: loginParamsSchema,
  surveyResult: surveyResultSchema,
  signUpParams: signUpParamsSchema,
  addSurveyParams: addSurveyParamsSchema,
  saveSurveyParams: saveSurveyParamsSchema
}
