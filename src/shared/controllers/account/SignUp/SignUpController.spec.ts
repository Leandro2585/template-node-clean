import { SignUpController } from './SignUpController'
import { EmailInUseError, MissingParamError, ServerError } from '../../../errors'
import { AddAccount, HttpRequest, Validation, Authentication } from './SignUpControllerProtocols'
import { badRequest, forbidden, ok, serverError } from '../../../helpers/http/HttpHelper'
import { AddAccountSpy, AuthenticationSpy, ValidationSpy } from '@shared/test'
import { throwError } from '@domain/test'
import faker from 'faker'

type SutTypes = {
  sut: SignUpController;
  addAccountSpy: AddAccountSpy;
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
}

const mockRequest = (): HttpRequest => {
  const password = faker.internet.password()
  return ({
  body: {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password,
    confirmPassword: password
  }})
}

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new SignUpController(addAccountSpy, validationSpy, authenticationSpy)

  return {
    sut,
    addAccountSpy,
    validationSpy,
    authenticationSpy
  }
}

describe('SignUp Controller', () => {
  test('should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addAccountSpy.params).toEqual({ 
      name: request.body.name,
      email: request.body.email,
      password: request.body.password 
    })
  })

  test('should return 500 if AddAccount throws', async () => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'create').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('should return 403 if AddAccount returns null', async () => {
    const { sut, addAccountSpy } = makeSut()
    addAccountSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token', name: 'any_name' }))
  })

  test('should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request.body)
  })

  test('should return 400 if validations returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(mockRequest())
    expect(authenticationSpy.params).toHaveBeenCalledWith({
      email: request.body.email,
      password: request.body.password
    })
  })

  test('should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
