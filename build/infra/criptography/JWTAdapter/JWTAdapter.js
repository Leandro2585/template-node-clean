"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JWTAdapter = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class JWTAdapter {
  constructor(secret) {
    this.secret = secret;
  }

  async encrypt(payload) {
    const accessToken = await _jsonwebtoken.default.sign({
      id: payload
    }, this.secret);
    return accessToken;
  }

}

exports.JWTAdapter = JWTAdapter;