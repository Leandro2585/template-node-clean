import { InvalidParamError } from '@shared/errors'
import { forbidden, serverError } from '@shared/helpers/http/HttpHelper'
import { Controller, HttpRequest, HttpResponse, LoadSurveyById, LoadSurveyResult } from './LoadSurveyResultControllerProtocols'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      await this.loadSurveyResult.load(surveyId)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
