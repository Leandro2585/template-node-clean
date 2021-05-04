import { LoadSurveysRepository } from '@data/protocols/database/survey/LoadSurveysRepository'
import { AddSurveyModel, AddSurveyRepository } from '@data/usecases/AddSurvey/DBAddSurveyProtocols'
import { SurveyModel } from '@domain/models/Survey'
import { MongoHelper } from '../helpers/MongoHelper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async create (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys: SurveyModel[] = await surveyCollection.find().toArray()
    return surveys
  }
}
