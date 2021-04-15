"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignUpController = void 0;

var _HttpHelper = require("../../helpers/http/HttpHelper");

class SignUpController {
  constructor(addAccount, validation) {
    this.addAccount = addAccount;
    this.validation = validation;
  }

  async handle(httpRequest) {
    try {
      const error = this.validation.validate(httpRequest.body);

      if (error) {
        console.log(error);
        return (0, _HttpHelper.badRequest)(error);
      }

      const {
        name,
        email,
        password
      } = httpRequest.body;
      const account = await this.addAccount.create({
        name,
        email,
        password
      });
      return (0, _HttpHelper.ok)(account);
    } catch (error) {
      return (0, _HttpHelper.serverError)(error);
    }
  }

}

exports.SignUpController = SignUpController;