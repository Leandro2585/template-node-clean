import { DBSaveSurveyResult } from '@data/usecases/surveyresult/SaveSurveyResult/DBSaveSurveyResult'
import { SaveSurveyResult } from '@domain/usecases/surveyresult/SaveSurveyResult'
import { SurveyResultMongoRepository } from '@infra/database/mongodb/surveyresult/SurveyResultMongoRepository'

export const makeDBSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DBSaveSurveyResult(surveyResultMongoRepository, surveyResultMongoRepository)
}
