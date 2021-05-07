import { MongoHelper, SaveSurveyResultParams, SaveSurveyResultRepository, SurveyResultModel } from './SurveyResultMongoRepositoryProtocols'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    const response = await surveyResultCollection.findOneAndUpdate({
      surveyId: data.surveyId,
      accountId: data.accountId
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true,
      returnOriginal: false
    })
    return response.value && MongoHelper.map(response.value)
  }
}
