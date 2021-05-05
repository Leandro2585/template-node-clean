import { DBLoadSurveys } from '@data/usecases/LoadSurveys/DBLoadSurveys'
import { LoadSurveys } from '@domain/usecases/LoadSurveys'
import { SurveyMongoRepository } from '@infra/database/mongodb/survey/SurveyMongoRepository'

export const makeDBLoadSurveys = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DBLoadSurveys(surveyMongoRepository)
}
