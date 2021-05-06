import { LoadSurveysRepository, SurveyModel, LoadSurveys } from './DBLoadSurveysProtocols'

export class DBLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}
  async load (): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll()
    return surveys
  }
}
