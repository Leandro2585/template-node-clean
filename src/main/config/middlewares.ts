import { Express } from 'express'
import { contentType } from '../middlewares/ContentType'
import { bodyParser } from '../middlewares/BodyParser'
import { cors } from '../middlewares/Cors'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
