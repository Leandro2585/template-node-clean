import { HttpResponse } from './Http'

export interface Middleware<T = any> {
  handle(request: T): Promise<HttpResponse>
}
