import { AccountModel } from '@domain/models/Account'

export const map = (account: any): AccountModel => {
  const { _id, ...accounWithoutId } = account
  return Object.assign({}, accounWithoutId, { id: _id })
}
