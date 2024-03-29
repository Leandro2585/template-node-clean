import { Validation } from '@app/protocols'

export class ValidationSpy implements Validation {
  error: Error = null;
  input: string;

  validate (input: any): Error {
    this.input = input
    return this.error
  }
}
