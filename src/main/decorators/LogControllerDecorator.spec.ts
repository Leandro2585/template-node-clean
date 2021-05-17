import { LogErrorRepository } from '@data/protocols/database/log/LogErrorRepository'
import { LogErrorRepositorySpy } from '@data/test'
import { AccountModel } from '@domain/models/Account'
import { mockAccountModel } from '@domain/test'
import { ok, serverError } from '@shared/helpers/http/HttpHelper'
import { Controller, HttpRequest, HttpResponse } from '@shared/protocols'
import { LogControllerDecorator } from './LogControllerDecorator'
import faker from 'faker'

type SutTypes = {
  sut: LogControllerDecorator;
  controllerSpy: ControllerSpy;
  logErrorRepositorySpy: LogErrorRepositorySpy;
}

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_mail@mail.com',
    password: 'any_password',
    confirmPassword: 'any_password'
  }
})

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

class ControllerSpy implements Controller {
  httpResponse = ok(faker.datatype.uuid())
  request: HttpRequest
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.request = httpRequest
    return this.httpResponse
  }
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
