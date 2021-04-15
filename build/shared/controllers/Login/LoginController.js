"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginController = void 0;

var _HttpHelper = require("../../helpers/http/HttpHelper");

class LoginController {
  constructor(authentication, validation) {
    this.authentication = authentication;
    this.validation = validation;
  }

  async handle(httpRequest) {
    try {
      const error = this.validation.validate(httpRequest.body);

      if (error) {
        return (0, _HttpHelper.badRequest)(error);
      }

      const {
        email,
        password
      } = httpRequest.body;
      const accessToken = await this.authentication.auth({
        email,
        password
      });

      if (!accessToken) {
        return (0, _HttpHelper.unauthorized)();
      }

      return (0, _HttpHelper.ok)({
        accessToken
      });
    } catch (error) {
      return (0, _HttpHelper.serverError)(error);
    }
  }

}

exports.LoginController = LoginController;