import { loginPath, signUpPath, surveyPath, surveyResultPath } from './paths'
import { badRequest, unauthorized, serverError, notFound, forbidden } from './components'
import { accountSchema, addSurveyParamsSchema, saveSurveyParamsSchema, apiKeyAuthSchema, errorSchema, loginParamsSchema, signUpParamsSchema, surveyAnswer, surveySchema, surveysSchema, surveyResultSchema } from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Template Clean Server',
    description: 'NodeJS Api server template using concepts design patterns, clean code and SOLID principles',
    version: '1.0.0'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/CPL-3.0-or-later.html'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Account'
  }, {
    name: 'Surveys'
  }],
  paths: {
    '/login': loginPath,
    '/signup': signUpPath,
    '/surveys': surveyPath,
    '/surveys/{surveyId}/results': surveyResultPath
  },
  schemas: {
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
  },
  components: {
    notFound,
    forbidden,
    badRequest,
    serverError,
    unauthorized,
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    }
  }
}
