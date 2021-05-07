import { AccountModel } from '@domain/models/Account'
import { AddAccountParams } from '@domain/usecases/AddAccount'

export interface AddAccountRepository {
  create(accountData: AddAccountParams): Promise<AccountModel>
}
