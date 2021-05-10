import {
  notFound,
  forbidden,
  badRequest,
  serverError,
  unauthorized
} from './components'
import { apiKeyAuthSchema } from './schemas'

export default {
  notFound,
  forbidden,
  badRequest,
  serverError,
  unauthorized,
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  }
}
