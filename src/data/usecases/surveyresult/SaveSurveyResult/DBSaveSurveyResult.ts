import { LoadSurveyResultRepository } from '../LoadSurveyResult/DBLoadSurveyResultProtocols'
import { SaveSurveyResult, SaveSurveyResultRepository, SurveyResultModel } from './DBSaveSurveyResultProtocols'

export class DBSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
    await this.saveSurveyResultRepository.save(data)
    return await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId, data.accountId)
  }
}
