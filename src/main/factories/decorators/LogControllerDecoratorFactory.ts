import { Controller } from '@app/protocols'
import { LogMongoRepository } from '@infra/mongodb'
import { LogControllerDecorator } from '@main/decorators/LogControllerDecorator'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logMongoRepository)
}
