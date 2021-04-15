"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeSignUpController = void 0;

var _SignUpController = require("@shared/controllers/SignUp/SignUpController");

var _DBAddAccount = require("@data/usecases/AddAccount/DBAddAccount");

var _BCryptAdapter = require("@infra/criptography/BCryptAdapter/BCryptAdapter");

var _AccountMongoRepository = require("@infra/database/mongodb/account/AccountMongoRepository");

var _LogControllerDecorator = require("../../decorators/LogControllerDecorator");

var _LogMongoRepository = require("@infra/database/mongodb/log/LogMongoRepository");

var _SignUpValidationFactory = require("./SignUpValidationFactory");

const makeSignUpController = () => {
  const salt = 12;
  const bcryptAdapter = new _BCryptAdapter.BCryptAdapter(salt);
  const addAccountRepository = new _AccountMongoRepository.AccountMongoRepository();
  const dbAddAccount = new _DBAddAccount.DBAddAccount(bcryptAdapter, addAccountRepository);
  const signUpController = new _SignUpController.SignUpController(dbAddAccount, (0, _SignUpValidationFactory.makeSignUpValidation)());
  const logMongoRepository = new _LogMongoRepository.LogMongoRepository();
  return new _LogControllerDecorator.LogControllerDecorator(signUpController, logMongoRepository);
};

exports.makeSignUpController = makeSignUpController;