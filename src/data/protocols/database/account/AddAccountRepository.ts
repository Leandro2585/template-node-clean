import { AddAccount } from '@domain/usecases/account'

export interface AddAccountRepository {
  create(account: AddAccountRepository.Params): Promise<AddAccountRepository.Result>
}

export namespace AddAccountRepository {
  export type Params = AddAccount.Params
  export type Result = AddAccount.Result
}