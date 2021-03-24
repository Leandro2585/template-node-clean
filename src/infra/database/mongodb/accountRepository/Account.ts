import { AddAccountRepository } from '@data/protocols/AddAccountRepository'
import { AccountModel } from '@domain/models/Account'
import { AddAccountModel } from '@domain/usecases/AddAccount'
import { MongoHelper } from '../helpers/MongoHelper'

export class AccountMongoRepository implements AddAccountRepository {
  async create (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = result.ops[0]
    const { _id, ...accounWithoutId } = account
    return Object.assign({}, accounWithoutId, { id: _id })
  }
}
