"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmailValidatorAdapter = void 0;

var _validator = _interopRequireDefault(require("validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EmailValidatorAdapter {
  isValid(email) {
    return _validator.default.isEmail(email);
  }

}

exports.EmailValidatorAdapter = EmailValidatorAdapter;