import { LoadSurveyByIdRepository } from '@data/usecases/LoadSurveyById/DBLoadSurveyByIdProtocols'
import { MongoHelper, AddSurveyModel, SurveyModel, AddSurveyRepository, LoadSurveysRepository } from './SurveyMongoRepositoryProtocols'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async create (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray()
    return MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: id })
    return survey && MongoHelper.map(survey)
  }
}
