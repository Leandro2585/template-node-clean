"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DBAddAccount = void 0;

class DBAddAccount {
  constructor(hasher, addAccountRepository) {
    this.hasher = hasher;
    this.addAccountRepository = addAccountRepository;
  }

  async create(accountData) {
    const hashedPassword = await this.hasher.hash(accountData.password);
    return await this.addAccountRepository.create(Object.assign({}, accountData, {
      password: hashedPassword
    }));
  }

}

exports.DBAddAccount = DBAddAccount;