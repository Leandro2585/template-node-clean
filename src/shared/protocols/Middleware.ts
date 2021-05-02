import { HttpRequest, HttpResponse } from './Http'

export interface Middleware {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>
}
