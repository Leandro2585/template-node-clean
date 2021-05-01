import { Validation } from '@shared/protocols'
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '@shared/helpers/validators'
import { EmailValidatorAdapter } from '@main/adapters/validators/EmailValidatorAdapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
