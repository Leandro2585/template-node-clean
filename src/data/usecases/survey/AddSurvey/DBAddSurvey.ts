import { AddSurveyRepository } from '@data/protocols/database/survey/AddSurveyRepository'
import { AddSurvey, AddSurveyParams } from './DBAddSurveyProtocols'

export class DBAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {}

  async create (data: AddSurveyParams): Promise<void> {
    await this.addSurveyRepository.create(data)
  }
}
