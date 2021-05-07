import { AccountModel } from '../../models/Account'

export type AddAccountParams = Omit<AccountModel, 'id'>

export interface AddAccount {
  create(account: AddAccountParams): Promise<AccountModel>;
}
