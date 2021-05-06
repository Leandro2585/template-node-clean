import { MongoHelper, AddSurveyModel, SurveyModel, AddSurveyRepository, LoadSurveysRepository } from './SurveyMongoRepositoryProtocols'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, SaveSurveyResult {
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
