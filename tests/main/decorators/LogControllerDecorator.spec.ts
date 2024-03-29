import { ok, serverError } from '@app/helpers/http'
import { Controller, HttpResponse } from '@app/protocols'
import { LogControllerDecorator } from '@main/decorators/LogControllerDecorator'
import { LogErrorRepositorySpy } from '@tests/data/fakes'
import faker from 'faker'

class ControllerSpy implements Controller {
  httpResponse = ok(faker.datatype.uuid())
  request: any
  async handle (request: any): Promise<HttpResponse> {
    this.request = request
    return this.httpResponse
  }
}

type SutTypes = {
  sut: LogControllerDecorator;
  controllerSpy: ControllerSpy;
  logErrorRepositorySpy: LogErrorRepositorySpy;
}

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

describe('LogController Decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerSpy } = makeSut()
    const request = faker.lorem.sentence()
    await sut.handle(request)
    expect(controllerSpy.request).toEqual(request)
  })

  test('should return the same result of the controller', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpResponse = await sut.handle(faker.lorem.sentence())
    expect(httpResponse).toEqual(controllerSpy.httpResponse)
  })

  test('should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    const serverError = mockServerError()
    controllerSpy.httpResponse = serverError
    await sut.handle(faker.lorem.sentence())
    expect(logErrorRepositorySpy.stack).toBe(serverError.body.stack)
  })
})
