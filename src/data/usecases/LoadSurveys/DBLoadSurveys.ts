import { LoadSurveysRepository } from '@data/protocols/database/survey/LoadSurveysRepository'
import { SurveyModel } from '@domain/models/Survey'
import { LoadSurveys } from '@domain/usecases/LoadSurveys'

export class DBLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}
  async load (): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll()
    return surveys
  }
}
