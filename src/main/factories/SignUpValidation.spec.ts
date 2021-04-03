import { RequiredFieldValidation } from '@presentation/helpers/validators/RequiredFieldValidation'
import { Validation } from '@presentation/helpers/validators/validation'
import { ValidationComposite } from '@presentation/helpers/validators/ValidationComposite'
import { makeSignUpValidation } from './SignUpValidation'

jest.mock('@presentation/helpers/validators/ValidationComposite')

describe('SignUpValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'cofirmPassword']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
