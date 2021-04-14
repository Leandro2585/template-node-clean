import { Validation } from '@shared/protocols'
import { ValidationComposite, RequiredFieldValidation, EmailValidation, CompareFieldsValidation } from '@shared/helpers/validators'
import { EmailValidatorAdapter } from '@main/adapters/validators/EmailValidatorAdapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'confirmPassword']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'confirmPassword'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
