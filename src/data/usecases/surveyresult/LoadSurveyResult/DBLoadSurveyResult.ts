import { LoadSurveyResult, LoadSurveyResultRepository, LoadSurveyByIdRepository, SurveyResultModel } from './DBLoadSurveyResultProtocols'

export class DBLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async load (surveyId: string, accountId: string): Promise<SurveyResultModel> {
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId, accountId)
    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId)
      surveyResult = {
        surveyId: survey.id,
        question: survey.question,
        date: survey.date,
        answers: survey.answers.map(answer => {
          return Object.assign({}, answer, {
            count: 0,
            percent: 0
          })
        })
      }
    }
    return surveyResult
  }
}
