import { LogErrorRepository } from '@data/protocols/database/log/LogErrorRepository'
import { mockLogErrorRepository } from '@data/test'
import { AccountModel } from '@domain/models/Account'
import { mockAccountModel } from '@domain/test'
import { ok, serverError } from '@shared/helpers/http/HttpHelper'
import { Controller, HttpRequest, HttpResponse } from '@shared/protocols'
import { LogControllerDecorator } from './LogControllerDecorator'

type SutTypes = {
  sut: LogControllerDecorator;
  controllerStub: Controller;
  logErrorRepositoryStub: LogErrorRepository;
  fakeRequest: HttpRequest;
  fakeAccount: AccountModel;
  fakeServerErrorStub: HttpResponse;
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_mail@mail.com',
    password: 'any_password',
    confirmPassword: 'any_password'
  }
})

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return new Promise(resolve => resolve(ok(mockAccountModel())))
    }
  }

  return new ControllerStub()
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = mockLogErrorRepository()
  const fakeRequest = makeFakeRequest()
  const fakeAccount = mockAccountModel()
  const fakeServerErrorStub = makeFakeServerError()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub,
    fakeServerErrorStub,
    fakeRequest,
    fakeAccount
  }
}

describe('LogController Decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub, fakeRequest } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    await sut.handle(fakeRequest)
    expect(handleSpy).toHaveBeenCalledWith(fakeRequest)
  })

  test('should return the same result of the controller', async () => {
    const { sut, fakeRequest, fakeAccount } = makeSut()

    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(ok(fakeAccount))
  })

  test('should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub, fakeRequest, fakeServerErrorStub } = makeSut()

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(fakeServerErrorStub))

    await sut.handle(fakeRequest)

    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
