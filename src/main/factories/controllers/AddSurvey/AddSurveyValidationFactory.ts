import { Validation } from '@shared/protocols'
import { ValidationComposite, RequiredFieldValidation } from '@validation/validators'

export const makeAddSurveysValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
