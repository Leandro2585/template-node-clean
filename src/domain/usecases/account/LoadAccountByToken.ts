import { AccountModel } from '@domain/models/Account';

export interface LoadAccountByToken {
  load(accessToken: string, role?: string): Promise<LoadAccountByToken.Result>
}

export namespace LoadAccountByToken {
  export type Result = AccountModel;
}