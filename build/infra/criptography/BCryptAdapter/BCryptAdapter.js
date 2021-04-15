"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BCryptAdapter = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BCryptAdapter {
  constructor(salt) {
    this.salt = salt;
  }

  async hash(payload) {
    const hash = await _bcrypt.default.hash(payload, this.salt);
    return hash;
  }

  async compare(payload, hash) {
    const isValid = await _bcrypt.default.compare(payload, hash);
    return isValid;
  }

}

exports.BCryptAdapter = BCryptAdapter;