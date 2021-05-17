import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '@validation/validators'
import { EmailValidatorAdapter } from '@infra/validators/EmailValidatorAdapter'
import { Validation } from '@shared/protocols'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
