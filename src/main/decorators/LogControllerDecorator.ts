import { LogErrorRepository } from '@data/protocols/database/log/LogErrorRepository'
import { Controller, HttpResponse } from '@app/protocols'

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository) {}

  async handle (request: any): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(request)
    if (httpResponse.statusCode === 500) {
      this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
