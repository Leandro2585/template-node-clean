import { ValidationComposite, RequiredFieldValidation } from '@validation/validators'
import { Validation } from '@shared/protocols'
import { makeAddSurveyValidation } from './AddSurveyValidationFactory'

jest.mock('@validation/validators/ValidationComposite')

describe('AddSurveyValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})