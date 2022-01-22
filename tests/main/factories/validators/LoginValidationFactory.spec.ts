import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '@validation/validators'
import { makeLoginValidation } from '@main/factories/validators'
import { EmailValidatorAdapter } from '@infra/validators/EmailValidatorAdapter'
import { Validation } from '@app/protocols'

jest.mock('@validation/validators/ValidationComposite')

describe('LoginValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
