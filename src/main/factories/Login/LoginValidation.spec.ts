import { EmailValidation } from '@presentation/helpers/validators/EmailValidation'
import { RequiredFieldValidation } from '@presentation/helpers/validators/RequiredFieldValidation'
import { Validation } from '@presentation/helpers/validators/validation'
import { ValidationComposite } from '@presentation/helpers/validators/ValidationComposite'
import { EmailValidator } from '@presentation/protocols'
import { makeLoginValidation } from './LoginValidation'

jest.mock('@presentation/helpers/validators/ValidationComposite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
