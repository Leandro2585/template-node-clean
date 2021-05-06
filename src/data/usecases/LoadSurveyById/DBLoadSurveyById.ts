import { SurveyModel } from '@domain/models/Survey'
import { LoadSurveyById } from '@domain/usecases/LoadSurveyById'
import { LoadSurveyByIdRepository } from '../../protocols/database/survey/LoadSurveyByIdRepository'

export class DBLoadSurveyById implements LoadSurveyById {
  constructor (private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) {}
  async loadById (id: string): Promise<SurveyModel> {
    await this.loadSurveyByIdRepository.loadById(id)
    return null
  }
}
