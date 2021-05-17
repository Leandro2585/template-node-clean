import { EmailValidation } from './EmailValidation'
import { InvalidParamError } from '@shared/errors'
import { EmailValidatorSpy } from '@validation/test'

type SutTypes = {
  sut: EmailValidation;
  emailValidatorSpy: EmailValidatorSpy;
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()

  const sut = new EmailValidation('email', emailValidatorSpy)

  return {
    sut,
    emailValidatorSpy
  }
}

describe('Email Validation', () => {
  test('should return an error if EmailValidator returns false', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isEmailValid = false
    const error = sut.validate({ email: 'any_email@mail.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut()
    sut.validate({ email: 'any_email@mail.com' })
    expect(emailValidatorSpy.email).toEqual('any_email@mail.com')
  })

  test('should throw if EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    expect(sut.validate).toThrow()
  })
})
