import { AccountModel } from '../models/Account'

export interface AddAccountModel {
  name: string;
  email: string;
  password: string;
}

export interface AddAccount {
  create(account: AddAccountModel): Promise<AccountModel>;
}