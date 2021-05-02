import { AddSurveyModel, AddSurveyRepository } from '@data/usecases/AddSurvey/DBAddSurveyProtocols'
import { MongoHelper } from '../helpers/MongoHelper'

export class SurveyMongoRepository implements AddSurveyRepository {
  async create (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }
}
