import { Controller } from '@shared/protocols'
import { LogMongoRepository } from '@infra/database/mongodb/log/LogMongoRepository'
import { LogControllerDecorator } from '@main/decorators/LogControllerDecorator'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logMongoRepository)
}
