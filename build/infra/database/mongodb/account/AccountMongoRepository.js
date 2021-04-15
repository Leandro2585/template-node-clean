"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccountMongoRepository = void 0;

var _MongoHelper = require("../helpers/MongoHelper");

class AccountMongoRepository {
  async create(accountData) {
    const accountCollection = await _MongoHelper.MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    const account = result.ops[0];
    return _MongoHelper.MongoHelper.map(account);
  }

  async loadByEmail(email) {
    const accountCollection = await _MongoHelper.MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({
      email
    });
    return account && _MongoHelper.MongoHelper.map(account);
  }

  async updateAccessToken(id, token) {
    const accountCollection = await _MongoHelper.MongoHelper.getCollection('accounts');
    await accountCollection.updateOne({
      _id: id
    }, {
      $set: {
        accessToken: token
      }
    });
  }

}

exports.AccountMongoRepository = AccountMongoRepository;