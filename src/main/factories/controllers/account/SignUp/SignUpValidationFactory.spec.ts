import { Validation } from '@shared/protocols'
import { ValidationComposite, RequiredFieldValidation, EmailValidation, CompareFieldsValidation } from '@validation/validators'
import { makeSignUpValidation } from './SignUpValidationFactory'
import { mockEmailValidator } from '@validation/test'

jest.mock('@validation/validators/ValidationComposite')

describe('SignUpValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'confirmPassword']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'confirmPassword'))
    validations.push(new EmailValidation('email', mockEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
