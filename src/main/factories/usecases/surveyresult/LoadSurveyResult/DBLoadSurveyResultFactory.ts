import { LoadSurveyResult } from '@domain/usecases/surveyresult'
import { DBLoadSurveyResult } from '@data/usecases/surveyresult/LoadSurveyResult/DBLoadSurveyResult'
import { SurveyMongoRepository } from '@infra/database/mongodb/survey/SurveyMongoRepository'
import { SurveyResultMongoRepository } from '@infra/database/mongodb/surveyresult/SurveyResultMongoRepository'

export const makeDBLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DBLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
