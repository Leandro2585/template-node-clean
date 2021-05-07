import { DBLoadSurveyById } from '@data/usecases/survey/LoadSurveyById/DBLoadSurveyById'
import { LoadSurveyById } from '@domain/usecases/LoadSurveyById'
import { SurveyMongoRepository } from '@infra/database/mongodb/survey/SurveyMongoRepository'

export const makeDBLoadSurveyById = (): LoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DBLoadSurveyById(surveyMongoRepository)
}
