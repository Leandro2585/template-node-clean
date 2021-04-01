export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = `Error - Missing param: ${paramName}`
  }
}
