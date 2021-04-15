"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeLoginController = void 0;

var _env = _interopRequireDefault(require("@main/config/env"));

var _LoginController = require("@shared/controllers/Login/LoginController");

var _LoginValidationFactory = require("./LoginValidationFactory");

var _DBAuthentication = require("@data/usecases/Authentication/DBAuthentication");

var _LogMongoRepository = require("@infra/database/mongodb/log/LogMongoRepository");

var _LogControllerDecorator = require("@main/decorators/LogControllerDecorator");

var _AccountMongoRepository = require("@infra/database/mongodb/account/AccountMongoRepository");

var _BCryptAdapter = require("@infra/criptography/BCryptAdapter/BCryptAdapter");

var _JWTAdapter = require("@infra/criptography/JWTAdapter/JWTAdapter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeLoginController = () => {
  const salt = 12;
  const bcryptAdapter = new _BCryptAdapter.BCryptAdapter(salt);
  const jwtAdapter = new _JWTAdapter.JWTAdapter(_env.default.jwtSecret);
  const accountMongoRepository = new _AccountMongoRepository.AccountMongoRepository();
  const dbAuththentication = new _DBAuthentication.DBAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository);
  const loginController = new _LoginController.LoginController(dbAuththentication, (0, _LoginValidationFactory.makeLoginValidation)());
  const logMongoRepository = new _LogMongoRepository.LogMongoRepository();
  return new _LogControllerDecorator.LogControllerDecorator(loginController, logMongoRepository);
};

exports.makeLoginController = makeLoginController;