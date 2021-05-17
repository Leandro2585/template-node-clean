import 'module-alias/register'
import env from './config/env'
import { MongoHelper } from '@infra/mongodb/helpers/MongoHelper'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`🚀Server started at http://localhost: ${env.port}`))
  })
  .catch(console.error)
