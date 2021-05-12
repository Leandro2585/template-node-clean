import { AccountModel } from '@domain/models/Account'
import { AddAccountParams } from '@domain/usecases/account/AddAccount'

export interface AddAccountRepository {
  create(account: AddAccountParams): Promise<AccountModel>
}
