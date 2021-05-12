import { LoadSurveyResult, LoadSurveyResultRepository, SurveyResultModel } from './DBLoadSurveyResultProtocols'

export class DBLoadSurveyResult implements LoadSurveyResult {
  constructor (private readonly loadSurveyResultRepository: LoadSurveyResultRepository) {}
  async load (surveyId: string): Promise<SurveyResultModel> {
    await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return null
  }
}
