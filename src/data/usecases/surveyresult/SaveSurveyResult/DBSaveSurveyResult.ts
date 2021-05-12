import { LoadSurveyResultRepository } from '../LoadSurveyResult/DBLoadSurveyResultProtocols'
import { SaveSurveyResult, SaveSurveyResultRepository, SurveyResultModel, SaveSurveyResultParams } from './DBSaveSurveyResultProtocols'

export class DBSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId)
    return surveyResult
  }
}
