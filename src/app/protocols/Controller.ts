import { serverError } from '@app/helpers/http'
import { HttpResponse } from '@app/protocols'

export abstract class Controller<T = any> {
  abstract execute(request: T): Promise<HttpResponse>

  async handle (request: T) {
    try {
      return await this.execute(request)
    } catch (error) {
      return serverError(error)
    }
  }
}
