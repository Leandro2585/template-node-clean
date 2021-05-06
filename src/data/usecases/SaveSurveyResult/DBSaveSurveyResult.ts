import { SaveSurveyResult, SaveSurveyResultRepository, SurveyResultModel, SaveSurveyResultModel } from './DBSaveSurveyResultProtocols'

export class DBSaveSurveyResult implements SaveSurveyResult {
  constructor (private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {}
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResult = await this.saveSurveyResultRepository.save(data)
    return surveyResult
  }
}
