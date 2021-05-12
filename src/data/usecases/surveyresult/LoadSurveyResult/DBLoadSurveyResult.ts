import { LoadSurveyResultRepository } from '@data/protocols/database/surveyresult/LoadSurveyResultRepository'
import { LoadSurveyResult } from '@domain/usecases/surveyresult/LoadSurveyResult'
import { SurveyResultModel } from '../SaveSurveyResult/DBSaveSurveyResultProtocols'

export class DBLoadSurveyResult implements LoadSurveyResult {
  constructor (private readonly loadSurveyResultRepository: LoadSurveyResultRepository) {}
  async load (surveyId: string): Promise<SurveyResultModel> {
    await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return null
  }
}
