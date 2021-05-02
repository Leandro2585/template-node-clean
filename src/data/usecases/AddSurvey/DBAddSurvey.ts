import { AddSurveyRepository } from '@data/protocols/database/survey/AddSurveyRepository'
import { AddSurvey, AddSurveyModel } from './DBAddSurveyProtocols'

export class DBAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {}

  async create (data: AddSurveyModel): Promise<void> {
    await this.addSurveyRepository.create(data)
  }
}
