import { AccountModel } from '../../domain/models/Account'
import { AddAccountModel } from '../../domain/usecases/AddAccount'

export interface AddAccountRepository {
  create(accountData: AddAccountModel): Promise<AccountModel>
}
