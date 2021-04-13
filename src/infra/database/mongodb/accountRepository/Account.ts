import { AddAccountRepository } from '@data/protocols/database/AddAccountRepository'
import { LoadAccountByEmailRepository } from '@data/protocols/database/LoadAccountByEmailRepository'
import { AccountModel } from '@domain/models/Account'
import { AddAccountModel } from '@domain/usecases/AddAccount'
import { MongoHelper } from '../helpers/MongoHelper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async create (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = result.ops[0]
    return MongoHelper.map(account)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }
}
