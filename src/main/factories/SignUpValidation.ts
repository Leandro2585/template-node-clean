import { CompareFieldsValidation } from '@presentation/helpers/validators/CompareFieldsValidation'
import { EmailValidation } from '@presentation/helpers/validators/EmailValidation'
import { RequiredFieldValidation } from '@presentation/helpers/validators/RequiredFieldValidation'
import { Validation } from '@presentation/helpers/validators/validation'
import { ValidationComposite } from '@presentation/helpers/validators/ValidationComposite'
import { EmailValidatorAdapter } from '@utils/EmailValidatorAdapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'confirmPassword']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'confirmPassword'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
