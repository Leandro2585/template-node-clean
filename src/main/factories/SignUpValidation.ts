import { CompareFieldsValidation } from '@presentation/helpers/validators/CompareFieldsValidation'
import { RequiredFieldValidation } from '@presentation/helpers/validators/RequiredFieldValidation'
import { Validation } from '@presentation/helpers/validators/validation'
import { ValidationComposite } from '@presentation/helpers/validators/ValidationComposite'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'cofirmPassword']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'confirmPassword'))
  return new ValidationComposite(validations)
}
