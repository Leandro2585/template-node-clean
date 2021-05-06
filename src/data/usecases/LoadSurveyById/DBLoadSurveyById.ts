import { SurveyModel, LoadSurveyById, LoadSurveyByIdRepository } from './DBLoadSurveyByIdProtocols'

export class DBLoadSurveyById implements LoadSurveyById {
  constructor (private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) {}
  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdRepository.loadById(id)
    return survey
  }
}
