import { LoadSurveyByIdRepository } from '@data/protocols/database/survey/LoadSurveyByIdRepository'
import { SurveyModel } from '@domain/models/Survey'
import { LoadSurveyResult, LoadSurveyResultRepository, SurveyResultModel } from './DBLoadSurveyResultProtocols'

export class DBLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async load (surveyId: string): Promise<SurveyResultModel | SurveyModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    if (!surveyResult) {
      await this.loadSurveyByIdRepository.loadById(surveyId)
    }
    return surveyResult
  }
}
