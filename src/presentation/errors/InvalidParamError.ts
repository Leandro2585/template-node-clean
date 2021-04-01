export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`Invalid param: ${paramName}`)
    this.name = `Error - Invalid param: ${paramName}`
  }
}
