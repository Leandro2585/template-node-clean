import { LoadSurveyById } from '../SaveSurveyResult/SaveSurveyResultControllerProtocols'
import { Controller, HttpRequest, HttpResponse } from './LoadSurveyResultControllerProtocols'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveyById.loadById(httpRequest.params.surveyId)
    return null
  }
}
