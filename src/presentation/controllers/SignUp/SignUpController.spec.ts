import { SignUpController } from './SignUpController'
import { MissingParamError, InvalidParamError, ServerError } from '../../errors'
import { EmailValidator, AddAccount, AddAccountModel, AccountModel } from './SignUpProtocols'
import { HttpRequest } from '@presentation/protocols'
import { badRequest, ok, serverError } from '../../helpers/HttpHelper'

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
  addAccountStub: AddAccount;
  fakeRequestStub: HttpRequest;
  fakeAccountStub: AccountModel;
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async create (account: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new AddAccountStub()
}

const makeFakeAccount = ():AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    confirmPassword: 'any_password'
  }
})

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const fakeRequestStub = makeFakeRequest()
  const fakeAccountStub = makeFakeAccount()
  const sut = new SignUpController(emailValidatorStub, addAccountStub)

  return {
    sut,
    addAccountStub,
    emailValidatorStub,
    fakeRequestStub,
    fakeAccountStub
  }
}

describe('SignUp Controller', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        confirmPassword: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        confirmPassword: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('should return 400 if no password is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        confirmPassword: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('should return 400 if no confirmPassword is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('confirmPassword')))
  })

  test('should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub, fakeRequestStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid')
      .mockReturnValueOnce(false)

    const httpResponse = await sut.handle(fakeRequestStub)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub, fakeRequestStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    await sut.handle(fakeRequestStub)
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub, fakeRequestStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const httpResponse = await sut.handle(fakeRequestStub)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('should return 400 if password confirmation fails', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        confirmPassword: 'invalid_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('confirmPassword')))
  })

  test('should call CreateUserService with correct values', async () => {
    const { sut, addAccountStub, fakeRequestStub } = makeSut()
    const createSpy = jest.spyOn(addAccountStub, 'create')

    await sut.handle(fakeRequestStub)
    expect(createSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub, fakeRequestStub } = makeSut()
    jest.spyOn(addAccountStub, 'create')
      .mockImplementationOnce(() => {
        return new Promise((resolve, reject) => {
          reject(new Error())
        })
      })

    const httpResponse = await sut.handle(fakeRequestStub)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('should return 200 if valid data is provided', async () => {
    const { sut, fakeRequestStub, fakeAccountStub } = makeSut()

    const httpResponse = await sut.handle(fakeRequestStub)
    expect(httpResponse).toEqual(ok(fakeAccountStub))
  })
})
