import { MissingParamError } from '@shared/errors'
import { ValidationComposite } from '@validation/validators/ValidationComposite'
import { ValidationSpy } from '@tests/validation/fakes'

type SutTypes = {
  sut: ValidationComposite;
  validationSpy: ValidationSpy[];
}

const makeSut = (): SutTypes => {
  const validationSpy = [new ValidationSpy(), new ValidationSpy()]
  const sut = new ValidationComposite(validationSpy)

  return {
    sut,
    validationSpy
  }
}

describe('Validation Composite', () => {
  test('should return an error if any validation fails', () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('should return the first error if more then one validation fails', () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationSpy[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new Error())
  })

  test('should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
