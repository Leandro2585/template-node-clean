import { DBAddSurvey } from '@data/usecases/survey/AddSurvey/DBAddSurvey'
import { AddSurvey } from '@domain/usecases/survey/AddSurvey'
import { SurveyMongoRepository } from '@infra/database/mongodb/survey/SurveyMongoRepository'

export const makeDBAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DBAddSurvey(surveyMongoRepository)
}
