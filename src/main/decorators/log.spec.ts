import { LogErrorRepository } from '@data/protocols/LogErrorRepository'
import { AccountModel } from '@domain/models/Account'
import { ok, serverError } from '@presentation/helpers/HttpHelper'
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols'
import { LogControllerDecorator } from './log'

interface SutTypes {
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

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return new Promise(resolve => resolve(ok(makeFakeAccount())))
    }
  }

  return new ControllerStub()
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log (stack: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new LogErrorRepositoryStub()
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const fakeRequest = makeFakeRequest()
  const fakeAccount = makeFakeAccount()
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

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(fakeServerErrorStub)))

    await sut.handle(fakeRequest)

    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
