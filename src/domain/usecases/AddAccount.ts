import { AccountModel } from '../models/Account'

export type AddAccountModel = Omit<AccountModel, 'id'>

export interface AddAccount {
  create(account: AddAccountModel): Promise<AccountModel>;
}
