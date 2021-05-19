import { SignUpController } from '@shared/controllers/account'
import { EmailInUseError, MissingParamError, ServerError } from '@shared/errors'
import { badRequest, forbidden, ok, serverError } from '@shared/helpers/http'
import { AddAccountSpy, AuthenticationSpy, ValidationSpy } from '@tests/shared/fakes'
import { throwError } from '@tests/domain/fakes'
import faker from 'faker'

type SutTypes = {
  sut: SignUpController;
  addAccountSpy: AddAccountSpy;
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
}

const mockRequest = (): SignUpController.Request => {
  const password = faker.internet.password()
  return ({
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password,
    confirmPassword: password
  })
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
      name: request.name,
      email: request.email,
      password: request.password 
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
    const { sut, authenticationSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ 
      accessToken: authenticationSpy.result.accessToken, 
      name: authenticationSpy.result.name 
    }))
  })

  test('should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
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
    await sut.handle(request)
    expect(authenticationSpy.params).toEqual({
      email: request.email,
      password: request.password
    })
  })

  test('should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
